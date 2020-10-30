const { program } = require('commander');
const packageConfig = require('./package.json');
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');
const logSymbols = require('log-symbols');
const { execCompress, recursiveCompressed } = require('./src/process');
const { processTwo } = require('./src/processTwo');
const { convert } = require('./src/expand');

log = (message) => { console.log(JSON.stringify(message)); };

program
  .version(packageConfig.version, '-v, --version', 'output the current version')
  .helpOption('-h, --help')
	.usage(
    `
      [--version] [--help]
		  <command> [option]
    `
  )
  .option('-q, --quality <ratio>',  'compress the imgages quality ratio')
  .option('-d, --dirname <dir>', 'Specifies the compressed resource path')
  .option('-f, --filename <file>', 'Specifies ths compressed file name')
  .option('-o, --output <export>', 'output file to another dir')
  .option('-t, --tobase <name>', 'to convert source data of base64');

// 貌似这个办法行不通
// program
//   .command('to <source>', 'to convert source data')
//   .action(function(source) {
//     if (source) {
//       try {
//         const file = fs.readFileSync(source);
//         console.log(chalk.green(file.toString('base64')));
//       } catch (e) {
//         console.log(logSymbols.error, e.message);
//       }
//     } else {
//       console.log(logSymbols.warning, 'please input the <source> path');
//     }
//   });

program.parse(process.argv);
// console.log(process.argv);

let params = {
  quality: 0.8,
  dirname: './',
  subdirectory: false,
  filename: ''
}

if (program.quality) {
  params.quality = program.quality;
}

if (program.dirname) {
  params.dirname = program.dirname.replace(/\/$/g, '') + '/';
}

if (program.filename) {
  params.filename = program.filename;
}

if (program.output) {
  params.output = program.output.replace(/\/$/g, '') + '/';
}

// log(chalk.green(JSON.stringify(params)));

(() => {
  if (program.tobase) {
    return convert(program.tobase);
  }
  
  // const arg_keys = Object.keys(program);
  // console.log(program.filename, program.dirname);
  const args = process.argv.slice(2);
  console.log(args);
  if (!program.filename && !program.dirname && args.length) {
    inquirer.prompt({
      type: 'list',
      name: 'subdirectory',
      message: 'Do you want to compress the subdirectory under the resource?',
      default: 1,
      choices: [
        {
          name: 'deep',
          value: true
        }, {
          name: 'shalow',
          value: false
        }
      ]
    }).then(res => {
      const { subdirectory } = res;
      console.log(logSymbols.success, subdirectory);
      processTwo(args, {
        subdirectory: subdirectory,
        output: params.output,
        quality: params.quality
      });
    })
    return false;
  }
  
  if (params.filename) {
    console.log(logSymbols.info, 'compress images start...');
    const spinner = ora('imgages compressing \n').start();
    execCompress(params);
    setTimeout(() => {
      spinner.color = 'green';
      spinner.succeed();
    }, 2000);
  
    setTimeout(() => {
      spinner.stop();
    }, 3000);
    return;
  }
  
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'subdirectory',
      message: 'Do you want to compress the subdirectory under the resource?',
      default: false
    }
  ]).then(res => {
    params = Object.assign(params, res);
    console.log('-->>', params);
    console.log(logSymbols.info, 'compress images start...');
    const spinner = ora('imgages compressing \n').start();
    setTimeout(() => {
      spinner.color = 'cyan';
    }, 1000);
  
    !res.subdirectory ? execCompress(params) : recursiveCompressed(params);
    setTimeout(() => {
      spinner.color = 'green';
      spinner.succeed();
    }, 2000);
  
    setTimeout(() => {
      spinner.stop();
    }, 3000);
  });
})();
