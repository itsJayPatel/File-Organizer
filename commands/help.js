const chalk = require("chalk");

function helpFn() {
    console.log(`
      ${chalk.underline.bold.yellow('List of All Commands')}
  
          ${chalk.magentaBright.bold(`fsorg tree "directoryPath"
          fsorg organize "directoryPath"
          fsorg help`)}
      `);
  }

module.exports={
  helpKey : helpFn
};