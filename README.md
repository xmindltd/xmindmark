# XMindMark - Lightweight markup language for **mind mapping**

[XMindMark](docs/specification.md) is a lightweight markup language for **mind mapping** inspired by **markdown**. It is designed to describe structures and elements of a mind map easily.

Just like everyone can use mind mapping software to organize ideas and improve efficiency, **everyone can benefit from XMindMark**.

XMindMark files are written in plain text, which means that you can describe a mind map faster using any text editor at any time anywhere, like:

```
Seasons
- Spring
- Summer
- Autumn
- Winter
```

For more infomation about **XMindMark syntax**, please visit [XMindMark specification](docs/specification.md).

The recommended way to save a XMindMark file is to use `.xmindmark` as its extension name, though you can use any other names as you like. If you are developing an application that distributes or generates XMindMark files, you're encouraged to use `application/vnd.xmind.xmindmark` as the [mime type](https://en.wikipedia.org/wiki/Media_type), or `org.xmind.openformat.xmindmark` as the [UTI](https://developer.apple.com/documentation/uniformtypeidentifiers).

## From XMindMark to Mind Map

We provide [xmindmark](https://github.com/xmindltd/xmindmark) to helps you convert XMindMark files into various forms of mind maps easily.

For an XMindMark file with the following content,
```
Seasons
- Spring
- Summer
- Autumn
- Winter
```
you can easily convert it to a graphical mind map using [xmindmark](https://github.com/xmindltd/xmindmark):

![seasons.svg](docs/seasons.svg)

See also:
- [Use xmindmark as a CLI program](#use-xmindmark-as-a-cli-program)
- [Use xmindmark as a Javascript library](#use-xmindmark-as-a-javascript-library)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)

### Use xmindmark as a CLI program

#### Install
Make sure [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) is available on your computer, and run the command below in your command line program:

```
npm install -g xmindmark
```

#### Convert xmindmark file to XMind file

```bash
> xmindmark <your-xmindmark-file>
```

A `.xmind` file will be generated in your working directory, which can then be opened and further edited using [XMind](https://www.xmind.net).

You can also pass your XMindMark file through standard input:

```bash
> cat <your-xmindmark-file> | xmindmark
```

This command has the same effect as the previous one.

#### Convert XMindMark file to SVG file

```bash
> xmindmark -f svg <your-xmindmark-file>
# or
> xmindmark --format svg <your-xmindmark-file> 
```

You can use `-f` or `--format` flag to specify the target format of the output file. So far xmindmark supports these target formats:
- `xmind`
- `svg`

If no target format is specified, xmindmark will use `xmind` by default.

In the case above, a `.svg` file will be generated in your working directory.

#### Specify the output directory

```bash
> xmindmark -o ./out <your-xmindmark-file>
# or
> xmindmark --outputDir ./out <your-xmindmark-file>
```

You can use `-o` or `--outputDir` flag to specify the output directory where the generated file will be placed. Both relative and absolute path are supported.

#### Get more information
```bash
> xmindmark -h
# or
> xmindmark --help
```

### Use xmindmark as a Javascript library

#### Install
```bash
> npm install xmindmark -S
```

#### Usage

```typescript
import { parseXMindMarkToXMindFile } from 'xmindmark'

const xmindMarkFileContent = `
Central Topic
- Main Topic 1
- Main Topic 2
`

const xmindArrayBuffer = await parseXMindMarkToXMindFile(xmindMarkFileContent)

```

Currently, xmindmark only supports converting `string` content to [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) of `.xmind` file. You can then save it to the local disk or upload it to an online storage.

### Roadmap

- **Default theme**. Generate files with pretty color theme. 
- **Syntax parser API**. Improve and expose the parser API to allow developers to obtain more detailed syntax and semantic information.
- **Editor language support**. Allow users to interact with XMindMark files easily and gracefully in text editors like Visual Studio Code.

### Troubleshooting

#### Getting stuck during conversion process

Converting XMindMark files to `.svg` files relies on a graphical environment, so when xmindmark converts an XMindMark file to a `.svg` file for the every first time, it must complete the following preparations:

1. Download a *bundled version* (specified [here](https://github.com/puppeteer/puppeteer/#q-which-chromium-version-does-puppeteer-use)) of Chromium by [puppeteer-core](https://www.npmjs.com/package/puppeteer-core).
2. Download the mind map rendering engine from XMind official website: https://assets.xmind.net.

These downloads will be cached in the local disk. The next time, xmindmark will just start converting if the cache is still valid.

If there is a problem during the preparation, please check whether your network is available. If the problem still exists, please [create an issue](https://github.com/xmindltd/xmindmark/issues/new).

#### "Output file exists"

If the file to be exported already exists, xmindmark will report a warning message and quit without doing anything else.

#### Other issues not mentioned here

You can try to find existing related [issues](https://github.com/xmindltd/xmindmark/issues), otherwise please [create an issue](https://github.com/xmindltd/xmindmark/issues/new) and report to us.
