const fs = require("fs");
const path = require("path");
const utility = require('../utility');
const chalk = require("chalk");

function organizeFn(dirPath) {
    if (dirPath == undefined) {
      let currDirPath=process.cwd();
      let destPath = path.join(currDirPath, "organizefiles");
      let doesPathExist = fs.existsSync(destPath);
      if (!doesPathExist) {
          fs.mkdirSync(destPath);
      }
      organizeHelper(currDirPath, destPath);
      return;
    } else {
      let doesPathExist = fs.existsSync(dirPath);
      if (doesPathExist) {
        //create organizefiles directory
        
        let destPath = path.join(dirPath, "organizefiles");
        doesPathExist = fs.existsSync(destPath);
        if (!doesPathExist) {
          fs.mkdirSync(destPath);
        }
        organizeHelper(dirPath, destPath);
      } else {
        console.log(chalk.redBright.bold("Enter Correct Path !!"));
        return;
      }
    }
  }
  
  function sendFiles(childPath,destDirPath,category){
  
      let categoryPath=path.join(destDirPath,category);
      if(fs.existsSync(categoryPath)==false){
          fs.mkdirSync(categoryPath);
      }
      let fileName=path.basename(childPath);
      let destFilePath=path.join(categoryPath,fileName);
      fs.copyFileSync(childPath,destFilePath);
      //fs.unlinkSync(childPath);
      //console.log(fileName, " is copied");
  }
  
  function organizeHelper(dirPath, destPath) {
    let childNames = fs.readdirSync(dirPath);
    for (let child of childNames) {
      let childPath=path.join(dirPath, child);
      let isFile = fs.lstatSync(childPath).isFile();
      if (isFile) {
        let category = getCategory(child);
        sendFiles(childPath,destPath,category);
      }
    }
  }
  
  function getCategory(name) {
    let extention = path.extname(name);
    
    //removing dot( . ) from extension
    extention = extention.slice(1);
  
    for(let type in utility.types){
        let ctypeArr=utility.types[type];
        for (let i = 0; i < ctypeArr.length; i++) {
            if(extention == ctypeArr[i])
                  return type;
        }
    }

    return "others";
  }

module.exports={
  organizeKey : organizeFn
}