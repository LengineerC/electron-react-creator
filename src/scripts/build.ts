import { execSync, ExecOptions } from "child_process";
import path from "path";
import * as process from "process";

const cliNodeModules = path.resolve(__dirname, "../../node_modules");
const projectRoot = process.cwd();
const env = {
  ...process.env,
  NODE_PATH: `${cliNodeModules}${path.delimiter}${process.env.NODE_PATH || ""}`,
  PATH: `${path.join(cliNodeModules, ".bin")}${path.delimiter}${process.env.PATH}`
};
const execOpt: ExecOptions = {
  cwd: projectRoot,
  env: env
};

const buildMainWebpackConfigPath = path.join(
  __dirname,
  "../config/webpack.main.prod.js"
);
const buildRendererWebpackConfigPath=path.join(
  __dirname,
  "../config/webpack.prod.js"
);


export function buildMain():void{
  execSync(`cross-env NODE_ENV=production webpack --config ${buildMainWebpackConfigPath}`,{stdio:"inherit",...execOpt});
}

export function buildRenderer():void{
  execSync(`webpack --config ${buildRendererWebpackConfigPath}`,{stdio:"inherit",...execOpt});
}

// export function genExe():void{
//   buildRenderer();
//   buildMain();
//   execSync("electron-builder --win",{stdio:"inherit",...execOpt});
// }

// export function releaseLinux():void{
//   buildRenderer();
//   buildMain();
//   execSync("electron-builder --linux",{stdio:"inherit",...execOpt});
// }

export function release(args:string[]):void{
  buildRenderer();
  buildMain();
  
  execSync(`electron-builder ${args.join(' ')}`,{stdio:"inherit",...execOpt});
}