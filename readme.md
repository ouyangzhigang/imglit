# :globe_with_meridians: imglit

[![npm](https://img.shields.io/badge/npm-imglit-green)](https://www.npmjs.com/package/imglit)
![Test](https://img.shields.io/github/issues/ouyangzhigang/imglit)
![Liscence](https://img.shields.io/github/license/ouyangzhigang/imglit)

Imglit is a imperative automatic compressing images by command control of npm tool


## :loudspeaker: Notice
imglit tools need install node&npm environmental. After that, it will be use and input on command.

## :star: Features
- It can be used across platforms
- Rich configuration options, providing powerful functionality
- For compressed images more concise, fast, efficient
- You simply need to install the global NPM toolkit [IMGLIT] to use
- Humanized interaction
- Support command tool drag into automatic identification file
- Base64 transformation is supported
- Support for depth identification of compressed files
- Intelligently identify files and compress them in the best way

## :rocket: Getting Started
If yon don't intall `imglit`, please install the tools of npm lib:

```sh
npm install -g imglit
```

## :clipboard: Inherit Options
- **`imglit -h`** (imglit --help)

  Report the tools command options params
  ```shell
  
  Usage: index
      [--version] [--help]
                  <command> [option]


  Options:
    -v, --version          output the current version
    -q, --quality <ratio>  compress the imgages quality ratio
    -d, --dirname <dir>    Specifies the compressed resource path
    -f, --filename <file>  Specifies ths compressed file name
    -o, --output <export>  output file to another dir
    -t, --tobase <name>    to convert source data of base64
    -h, --help             display help for command
  ```
  
> NOTE: support drag file or dir to command
> `imglit ` can Intelligent identification of files or folders for automatic compression

## :wrench: Imglit Configrations

`imglit` run comman to compressing current dir internal images:

```js
params = {
  quality: 0.8,
  dirname: './',
  subdirectory: false,
  filename: ''
}
```

## :white_check_mark: example
* default run
```shell
  $: imglit
```

* compressing a single image
```shell
  $: imglit -f hello.png
  # or
  $: imglit hello.png
  $ or
  $: img "C:\Users\ouyangzhigang-pc\Documents\WeChat Files\wxid_yvguh2ajmwgs21\FileStorage\File\2020-10\00d12a0c0d26902390d8694e7e08e903_t.gif" 
```

* compressing in a folder images
```shell
  $: imglit -d folder
  # or
  $: imglit folder
```

* compresing mutiple folder and file
```shell
  $: imglit "C:\Users\ouyangzhigang-pc\Documents\WeChat Files\wxid_yvguh2ajmwgs21\FileStorage\File\2020-10\00d12a0c0d26902390d8694e7e08e903_t.gif" "C:\Users\ouyangzhigang-pc\Documents\WeChat Files\wxid_yvguh2ajmwgs21\FileStorage\File\2020-10\6f5dc47569a5b862e5682c16c990479d_t.gif" E:\private\h5-cdn\wlh-h5\src\assets\img
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/ouyangzhigang/imglit/CHANGELOG.md).

## :exclamation: Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/ouyangzhigang/imglit/issues) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
