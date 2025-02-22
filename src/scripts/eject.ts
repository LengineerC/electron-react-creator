import { confirm } from "@inquirer/prompts";
import * as fsExtra from "fs-extra";
import path from "path";
import process from "process";
import { execSync } from "child_process";

const originScripts = {
  "start-main": "cross-env NODE_ENV=development electron .",
  "start-renderer": "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js",
  "build-renderer": "webpack --config config/webpack.prod.js",
  "build-main": "cross-env NODE_ENV=production webpack --config config/webpack.main.prod.js",
  "gen-exe": "npm run build-renderer && npm run build-main && electron-builder --win"
}

const devDependencies = {
  "@babel/core": "^7.26.7",
  "@babel/preset-env": "^7.26.7",
  "@babel/preset-react": "^7.26.3",
  "babel-loader": "^9.2.1",
  "clean-webpack-plugin": "^4.0.0",
  "cross-env": "^7.0.3",
  "css-loader": "^7.1.2",
  "global": "^4.4.0",
  "html-loader": "^5.1.0",
  "html-webpack-plugin": "^5.6.3",
  "node-polyfill-webpack-plugin": "^4.1.0",
  "sass": "^1.83.4",
  "sass-loader": "^16.0.4",
  "style-loader": "^4.0.0",
  "text-encoding": "^0.7.0",
  "webpack": "5.97.1",
  "webpack-cli": "^6.0.1",
  "webpack-dev-server": "^5.2.0",
  "webpack-merge": "^6.0.1"
}

export default async function eject() {
  const answer = await confirm({ message: "Are you sure to eject webpack config? It's a irrevocable operation!" });

  if (answer) {
    try {
      const PROJECT_ROOT = process.cwd();
      const packageJsonPath = path.resolve(PROJECT_ROOT, "package.json");

      const resNames = fsExtra.readdirSync(PROJECT_ROOT);
      if (resNames.includes("config")) {
        console.error("Directory config has existed!");
        return;
      }

      let projectPackageJson = JSON.parse(fsExtra.readFileSync(packageJsonPath).toString());

      projectPackageJson["devDependencies"] = {
        ...projectPackageJson["devDependencies"],
        ...devDependencies
      }

      projectPackageJson["scripts"] = originScripts;

      fsExtra.writeFileSync(packageJsonPath, JSON.stringify(projectPackageJson, null, 2), { encoding: "utf-8" });

      fsExtra.mkdirSync(path.join(PROJECT_ROOT, "config"));
      fsExtra.copySync(path.join(__dirname, "../config"), path.join(PROJECT_ROOT, "config"));

      execSync("npm install",{
        cwd:PROJECT_ROOT,
        stdio:"inherit"
      });

      console.log("Eject successfully!");
    } catch (err) {
      console.error("Failed to eject!", err);
    }

  } else {
    console.log("Canceled");
  }

}
