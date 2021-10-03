#!/usr/bin/env node
let inputArr = process.argv.slice(2);
const helpObj=require('./commands/help');
const treeObj=require('./commands/tree');
const organizeObj=require('./commands/organize');

let command = inputArr[0];
let dirPath = inputArr[1];

switch (command) {
  case "tree":
    treeObj.treeKey(dirPath);
    break;
  case "organize":
    organizeObj.organizeKey(dirPath);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("PLEASE ENTER CORRECT COMMAND");
    break;
}