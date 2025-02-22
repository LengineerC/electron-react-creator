import { exec, execSync, ExecOptions } from "child_process";
import path from "path";
import * as process from "process";
import net from "net";

const cliNodeModules = path.resolve(__dirname, "../../node_modules");

const projectRoot = process.cwd();

const env = {
  ...process.env,
  NODE_PATH: `${cliNodeModules}${path.delimiter}${process.env.NODE_PATH || ""}`,
  PATH: `${path.join(cliNodeModules, ".bin")}${path.delimiter}${process.env.PATH}`
};

const webpackConfigPath = path.join(
  __dirname,
  "../config/webpack.dev.js"
);

const execOpt: ExecOptions = {
  cwd: projectRoot,
  env: env
};

export function startRenderer(): void {
  execSync(`webpack serve --config "${webpackConfigPath}"`, {
    stdio: "inherit",
    ...execOpt
  });
}

export function startMain(): void {
  execSync("cross-env NODE_ENV=development electron .", {
    stdio: "inherit",
    ...execOpt
  });
}

export function startDev(): void {
  const startRenderer = exec(
    `webpack serve --config "${webpackConfigPath}"`,
    execOpt
  );

  const checkPort = (port: number) => {
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.once('error', () => {
        resolve(true); 
      });
      
      server.once('listening', () => {
        server.close(() => resolve(false)); 
      });
      
      server.listen(port);
    });
  };

  let startedListening=false;
  const waitForPortOccupied = async (port: number) => {
    if(!startedListening) startedListening=true;
    while (true) {
      const isPortOccupied = await checkPort(port);
      if (isPortOccupied) {
        break;
      } else {
        await new Promise(resolve => setTimeout(resolve, 500)); 
      }
    }
  };


  startRenderer.stdout?.on('data', (data) => {
    console.log(`Renderer Process: ${data}`);

    if(!startedListening){
      waitForPortOccupied(3000).then(() => {
        console.log("✅ Webpack Dev Server started, starting main process...");
  
        const startMain = exec("cross-env NODE_ENV=development electron .", execOpt);
  
        startMain.stdout?.on('data', (data) => {
          console.log(`Main Process: ${data}`);
        });
  
        startMain.stderr?.on('data', (data) => {
          console.error(`Main Process Error: ${data}`);
        });
  
        startMain.on('close', (code) => {
          console.log(`Main process exited with code ${code}`);
  
          if (startRenderer) {
            console.log("Closing Webpack Dev Server...");
            startRenderer.kill('SIGKILL');
          }
        });
      });
    }
  });

  startRenderer.stderr?.on('data', (data) => {
    console.error(`Renderer Process Error: ${data}`);
  });

  startRenderer.on('close', (code) => {
    console.log(`Renderer process exited with code ${code}`);
  });
}