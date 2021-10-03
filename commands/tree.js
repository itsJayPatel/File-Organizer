const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function treeFn(dirPath) {
    if (dirPath == undefined) {
        //console.log("Kindly Enter the Path!!");
        let currDirPath=process.cwd();
        treeHelper(currDirPath,"");
        return;
      } else {
        let doesPathExist = fs.existsSync(dirPath);
        if (doesPathExist) {
          treeHelper(dirPath,"");
        } else {
            console.log(chalk.redBright.bold("Enter Correct Path !!"));
          return;
        }
    }
}

function treeHelper(dirPath,indent){

    //is file or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName= path.basename(dirPath);
        console.log(indent + chalk.magentaBright("├──") + chalk.cyanBright(fileName));
    }else{
        let dirName= path.basename(dirPath);
        console.log(indent+chalk.magentaBright("└──")+chalk.yellow(dirName));
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath=path.join(dirPath,childrens[i]);
            treeHelper(childPath,indent+"    ")
        }
    }
}

module.exports = {
    treeKey : treeFn
};