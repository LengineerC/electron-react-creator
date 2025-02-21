import * as fsExtra from 'fs-extra';
import path from 'path';
import * as process from "process";
import { input } from "@inquirer/prompts";
import { FILENAME_PATTERN } from './utils/pattern';
import { execSync } from 'child_process';

async function getProjectName(): Promise<string> {
  let projectName: string = "";

  while (true) {
    projectName = await input({ message: "Input the project name:" });
    const resourceNames = fsExtra.readdirSync(process.cwd());

    if (!FILENAME_PATTERN.test(projectName)) {
      console.error("Invalid name, please input again!");
      continue;
    }

    let existSameName: boolean = false;
    if (resourceNames.includes(projectName)) {
      if (fsExtra.readdirSync(path.join(process.cwd(), projectName)).length !== 0) {
        existSameName = true;
      }
    }

    if (existSameName) {
      console.error(`A project with the name "${projectName}" already exists! Please choose a different name.`);
      continue;
    }

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

async function main(): Promise<void> {
  try {
    const projectName = await getProjectName();
    const projectPath = path.join(process.cwd(), projectName);

    if (!fsExtra.existsSync(projectPath)) {
      fsExtra.mkdirSync(projectPath);
    }
    copyTemplate(projectPath);
    installDependencies(projectPath);

  } catch (err) {
    if (err instanceof Error && err.name === 'ExitPromptError') {
      console.log('👋 See you next time!');

    } else {
      console.error("Failed to build project!", err);
    }
  }
}

main();