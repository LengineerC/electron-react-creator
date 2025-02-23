#!/usr/bin/env node

import * as fsExtra from 'fs-extra';
import path from 'path';
import * as process from "process";
import { input } from "@inquirer/prompts";
import { FILENAME_PATTERN } from './utils/patterns';
import { execSync } from 'child_process';
import { COMMANDS } from './utils/commands';
import { startDev, startMain, startRenderer } from './scripts/start';
import { buildMain, buildRenderer, release } from './scripts/build';
import eject from './scripts/eject';

function verifyProjectName(projectName:string):boolean{
  const resourceNames = fsExtra.readdirSync(process.cwd());

  if (!FILENAME_PATTERN.test(projectName)) {
    console.error("Invalid name, please input again!");

    return false;
  }

  let existSameName: boolean = false;
  if (resourceNames.includes(projectName)) {
    if (fsExtra.readdirSync(path.join(process.cwd(), projectName)).length !== 0) {
      existSameName = true;
    }
  }

  if (existSameName) {
    console.error(`A project with the name "${projectName}" already exists! Please choose a different name.`);
    return false;
  }

  return true;
}

async function getProjectName(): Promise<string> {
  let projectName: string = "";

  while (true) {
    projectName = await input({ message: "Input the project name:" });
    if(!verifyProjectName(projectName)) continue;

    break;
  }

  return projectName;
}

function copyTemplate(projectPath: string): void {
  const templatePath = path.resolve(__dirname, '../template');

  try {
    fsExtra.copySync(templatePath, projectPath);

  } catch (err) {
    console.error("Failed to copy template!");
    throw err;
  }

}

function installDependencies(projectPath: string): void {
  try {
    console.log("Start to install dependencies...");
    execSync("npm install", {
      cwd: projectPath,
      stdio: "inherit"
    });

    console.log('Dependencies installed successfully!');
  } catch (err) {
    console.error("Failed to install dependencies!");
    throw err;
  }
}

async function main(args:string[]): Promise<void> {
  try {
    switch(args[0]){
      case COMMANDS.VERSION:
      case COMMANDS.VERSION_SHORT:
        const version=JSON.parse(fsExtra.readFileSync(path.resolve(__dirname,"../package.json")).toString())["version"];
        console.log(`ercli version: ${version}`);
        break;

      case COMMANDS.HELP:
        const helpInfo=`
        Electron React Creator help:
        - Check cli version: ercli --version or ercli -v

        Create:
        - Create a new project: ercli create <project-name>
        - Run both of main and renderer processes: npm run start-dev

        Start:
        - main process: npm run start-main
        - renderer process: npm run start-renderer

        Build:
        - Build as a nsis installer: npm run gen-exe
        - main process: npm run build-main
        - renderer process: npm run build-renderer

        Eject:
        - You can run npm run eject to expose client webpack configurations, then you can edit it 
        - npm run start-dev will disabled after ejecting
        `;
        console.log(helpInfo);
        break;

      case COMMANDS.CREATE:{
        const projectName = args[1] || await getProjectName();
        const projectPath = path.join(process.cwd(), projectName);
    
        if (!fsExtra.existsSync(projectPath)) {
          fsExtra.mkdirSync(projectPath);
        }
        copyTemplate(projectPath);
        installDependencies(projectPath);

        break;
      }

      case COMMANDS.START_DEV:
        startDev();
        break;

      case COMMANDS.START_MAIN:
        startMain();
        break;

      case COMMANDS.START_RENDERER:
        startRenderer();
        break;

      case COMMANDS.BUILD_MAIN:
        buildMain();
        break;

      case COMMANDS.BUILD_RENDERER:
        buildRenderer();
        break;

      case COMMANDS.RELEASE:
        release(args.splice(1));
        break;

      case COMMANDS.EJECT:
        eject();
        break;

      default:
        console.error("Unknown command!");
    }

  } catch (err) {
    if (err instanceof Error && err.name === 'ExitPromptError') {
      console.log('👋 See you next time!');

    } else {
      console.error("Failed to build project!", err);
    }
  }
}

main(process.argv.slice(2));