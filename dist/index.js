(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var _require = require('commander'),
      program = _require.program;

  var packageConfig = require('./package.json');

  var chalk = require('chalk');

  var fs = require('fs');

  var ora = require('ora');

  var inquirer = require('inquirer');

  var logSymbols = require('log-symbols');

  var _require2 = require('./src/process'),
      execCompress = _require2.execCompress,
      recursiveCompressed = _require2.recursiveCompressed;

  var _require3 = require('./src/processTwo'),
      processTwo = _require3.processTwo;

  var _require4 = require('./src/expand'),
      convert = _require4.convert;

  log = function log(message) {
    console.log(JSON.stringify(message));
  };

  program.version(packageConfig.version, '-v, --version', 'output the current version').helpOption('-h, --help').usage("\n      [--version] [--help]\n\t\t  <command> [option]\n    ").option('-q, --quality <ratio>', 'compress the imgages quality ratio').option('-d, --dirname <dir>', 'Specifies the compressed resource path').option('-f, --filename <file>', 'Specifies ths compressed file name').option('-o, --output <export>', 'output file to another dir').option('-t, --tobase <name>', 'to convert source data of base64'); // 貌似这个办法行不通
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

  program.parse(process.argv); // console.log(process.argv);

  var params = {
    quality: 0.8,
    dirname: './',
    subdirectory: false,
    filename: ''
  };

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
  } // log(chalk.green(JSON.stringify(params)));


  (function () {
    if (program.tobase) {
      return convert(program.tobase);
    } // const arg_keys = Object.keys(program);
    // console.log(program.filename, program.dirname);


    var args = process.argv.slice(2);
    console.log(args);

    if (!program.filename && !program.dirname && args.length) {
      inquirer.prompt({
        type: 'list',
        name: 'subdirectory',
        message: 'Do you want to compress the subdirectory under the resource?',
        "default": 1,
        choices: [{
          name: 'deep',
          value: true
        }, {
          name: 'shalow',
          value: false
        }]
      }).then(function (res) {
        var subdirectory = res.subdirectory;
        console.log(logSymbols.success, subdirectory);
        processTwo(args, {
          subdirectory: subdirectory,
          output: params.output,
          quality: params.quality
        });
      });
      return false;
    }

    if (params.filename) {
      console.log(logSymbols.info, 'compress images start...');
      var spinner = ora('imgages compressing \n').start();
      execCompress(params);
      setTimeout(function () {
        spinner.color = 'green';
        spinner.succeed();
      }, 2000);
      setTimeout(function () {
        spinner.stop();
      }, 3000);
      return;
    }

    inquirer.prompt([{
      type: 'confirm',
      name: 'subdirectory',
      message: 'Do you want to compress the subdirectory under the resource?',
      "default": false
    }]).then(function (res) {
      params = Object.assign(params, res);
      console.log('-->>', params);
      console.log(logSymbols.info, 'compress images start...');
      var spinner = ora('imgages compressing \n').start();
      setTimeout(function () {
        spinner.color = 'cyan';
      }, 1000);
      !res.subdirectory ? execCompress(params) : recursiveCompressed(params);
      setTimeout(function () {
        spinner.color = 'green';
        spinner.succeed();
      }, 2000);
      setTimeout(function () {
        spinner.stop();
      }, 3000);
    });
  })();

})));
