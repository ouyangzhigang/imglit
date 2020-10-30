const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
/**
 * @name execCompress
 * @param {*} params 
 */
async function execCompress (params) {
  console.log(chalk.green('step 1', JSON.stringify(params)));
  let pngPathRule = [params.dirname + '*.png'];
  let jpgPathRule = [params.dirname + '*.jpg'];
  if (params.filename) {
    pathRule = params.filename.split(',').map(item => { return params.dirname ? `${params.dirname}/${item}` : item; });
    console.log(chalk.green('step 2', pathRule));
		if (/.(jpg|jpeg)$/gi.test(pathRule)) {
      console.log(chalk.green('step 3'));
			const jpg_file = await imagemin(pathRule, {
			  destination: params.output || path.dirname(params.filename),
			  plugins: [
			    imageminMozjpeg({
            quality: Number(params.quality) * 100,
            progressive: true
			    })
			  ]
			});
			console.log('step 5 \n \t result ->>', chalk.blue(jpg_file));
		} else {
      console.log(chalk.green('step 3'));
			const png_file = await imagemin(pathRule, {
			  destination: params.output || path.dirname(params.filename),
			  plugins: [
			    imageminPngquant({
            speed: 7,
			      quality: [Number(params.quality), 1]
			    })
			  ]
			});
			console.log('step 5 \n \t\t result ->>', chalk.blue(png_file));
		}
		return false;
  }
  const jpg_files = await imagemin(jpgPathRule, {
    destination: params.output || params.dirname,
    plugins: [
      imageminMozjpeg({
        quality: Number(params.quality) * 100,
        progressive: true
      })
    ]
  });

  console.log('jpeg_files ----->', jpg_files);

  const png_files = await imagemin(pngPathRule, {
    destination: params.output || params.dirname,
    plugins: [
      imageminPngquant({
        speed: 7,
        quality: [Number(params.quality), 1]
      })
    ]
  });

  console.log('png_files ----->', png_files);
  return false;
}

/**
 * @name recursiveCompressed
 * @params {*}
 * 
 */
async function recursiveCompressed(params) {
  await execCompress(params);
  // console.log(chalk.red(JSON.stringify(params)));
  fs.readdir(params.dirname, (err, files) => {
    if (err) {
      console.log(logSymbols.warning, err);
    }
    if (!files) {
      console.log(chalk.red('dont find the dir!'));
      return false;
    }
    files.forEach((file) => {
      let next_file = [params.dirname, file].join('');
      console.log(logSymbols.success, ['file is ', next_file, ' compressed!'].join(' '));
      let stat = fs.lstatSync(next_file);
      // console.log('stat is ', stat);
      if (stat.isDirectory()) {
        let next_params = {
          dirname: params.dirname ? [params.dirname, file, '/'].join('') : file,
          quality: params.quality,
          subdirectory: true
        };
        recursiveCompressed(next_params);
      }
    });
  }); 
}

module.exports = {
  execCompress,
  recursiveCompressed
};