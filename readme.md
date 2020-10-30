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
  

> NOTE: limitation
> `vue-cli-service i18n:report` cannot detect missing and unused keys from local messages of i18n custom blocks.
