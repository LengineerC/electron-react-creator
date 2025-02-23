import { execSync } from "child_process";
import * as process from 'process';
import * as fsExtra from "fs-extra";
import path from "path";

try{
  execSync("tsc",{cwd:process.cwd()});    

  const webpackConfigDir=path.join(__dirname,"../config");
  const distDir=path.join(process.cwd(),"./bin");

  fsExtra.copySync(webpackConfigDir,path.join(distDir,"config"));

}catch(err){
  console.error("Build cli error:",err);
}