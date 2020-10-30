const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
// const imageminJpegtran = require('imagemin-jpegtran');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const imgSize = require('image-size');

/**
 * @function execCompress
 * @param {*} params 
 */
function execCompress(params) {
  console.log(chalk.blue('step 1 ->> check ...'));
  // console.log(chalk.blue('step 1 ->>', JSON.stringify(params)));
  const demension = imgSize(params.filename);
  // console.log(chalk.red(JSON.stringify(demension)));
  sharp(params.file)
    .resize(~~(demension.width * params.quality), null, {
      fit: 'contain'
    })
    .toFile(params.filename, function(err, data) {
      if (err) console.log(err)
      else console.log(logSymbols.success, `file is deal width success! \n\t >>> ${params.filename}`);
    });
}

/**
 * @function recursiveCompressed 
 * @param {*} params 
 */
function recursiveCompressed(params) {
  const files = fs.readdirSync(params.filename);
  files.forEach(file => {
    const { quality, output } = params;
    let next_params = {
      file: '',
      filename: params.file,
      quality: quality || 0.8,
      output: output || ''
    };

    const next_file = path.join(params.filename, file);
    const stat = fs.lstatSync(next_file);
    if (stat.isDirectory()) {
      next_params['filename'] = path.join(next_file, '/');
      recursiveCompressed(next_params);
    } else if (stat.isFile() && /\.(jpe?g|png)$/ig.test(file)) {
      next_params['filename'] = next_file;
      next_params['file'] = fs.readFileSync(next_file);
      execCompress(next_params);
    } else {
      console.log(logSymbols.warning, 'please check need handle file type!\n', params.filename);
      console.log('\n');
    }
  });
}

/**
 * 
 * @function processTwo
 * @param { files }
 * 
 */
function processTwo(files, params) {
  files.forEach(file => {
    console.log(logSymbols.info, `processTwo file =>> ${file}`);
    const stat = fs.lstatSync(file);
    const {
      quality, output, subdirectory
    } = params;
    let next_params = {
      file: '',
      filename: file,
      quality: quality || 0.8,
      output: output || '',
      subdirectory: subdirectory || false
    };
    if (stat.isDirectory()) {
      if (params.subdirectory) {
        // console.log(next_params);
        recursiveCompressed(next_params);
      } else {
        const next_files = fs.readdirSync(file);
        next_files.forEach(next_file => {
          const next_filename = path.join(file, next_file);
          const next_stat = fs.lstatSync(next_filename);
          next_params['filename'] = next_filename;
          if (next_stat.isFile() && /\.(jpe?g|png)$/ig.test(next_params.filename)) {
            next_params['file'] = fs.readFileSync(next_params.filename);
            execCompress(next_params);
          }
        });
      }
    } else if (stat.isFile() && /\.(jpe?g|png)$/ig.test(next_params.filename)) {
      next_params['file'] = fs.readFileSync(next_params.filename);
      execCompress(next_params);
    } else {
      console.log('hello');
      console.log(logSymbols.warning, 'please check need handle file type!');
    }
  });
} 


module.exports = {
  processTwo
};