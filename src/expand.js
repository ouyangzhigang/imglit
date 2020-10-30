const fs = require('fs');
const logSymbols = require('log-symbols');
const chalk = require('chalk');

/**
 * @function convert
 * @param {name} file
 * @param {name} dir
 */
const convert = (name) => {
  const readFile = (files) => {
    try {
      const stat = fs.lstatSync(files);
      if (stat.isFile()) {
        let file = fs.readFileSync(files);
        console.log(`${files} =>> `, chalk.green(file.toString('base64')));
      } else {
        console.log(logSymbols.warning, `${files} not file type, continue run ~`);
      }
    } catch (e) {
      console.log(logSymbols.warning, e.message);
    }
  }
  const stat = fs.lstatSync(name);
  if (stat.isDirectory()) {
    fs.readdir(`${name.repalce(/\/$/g)}/`, (err, files) => {
      if (err) {
        console.log(logSymbols.error, err.message);
        return;
      }
      files.forEach(file => {

        readFile(name);
      });
    });
  } else {
    readFile(name);
  }
}

module.exports = {
  convert
}