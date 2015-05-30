# The p5.js Command Line Interface

## About

This project is a command-line interface (CLI) for use with [p5.js](http://p5js.org), a JavaScript library that implements the goals of the [Processing](http://processing.org) language natively for the web. p5 lets you sketch in the browser, and this tool lets you get sketching as quickly as possible!

## Installation

### Installing Node

p5-cli depends on **Node.js**, a platform for running JavaScript code on your own computer. To download Node visit [nodejs.org](http://nodejs.org)&mdash;the green "install" button will pick the version that is right for your operating system.

### Installing the CLI

Once Node is installed, fire up a command line. On a Mac this will be the "Terminal" application, in the "Utilities" folder within your Applications directory. On Windows you'll be looking for the "Command Prompt" program, also called "cmd"; if you can't find it, try searching for it.

Depending on your familiarity with the command line, this may be intimidating. If you haven't worked with the terminal or command prompt before, try searching for a quick start guide or find a friend to help you out. Knowing the basics will be helpful later on!

Once you're comfortable, run this command to install the p5 CLI:

```bash
npm install -g p5-cli
```

What that did was use NPM (a package manager for programs written in Node.js) to install the `p5-cli` library (that's us!) globally (`-g`) on your machine.

To see if it worked, try running `p5 --version` from your command line. If the command works and outputs a number, the CLI is installed correctly.

## p5 serve \<file or directory\>

What the CLI does is allow you to run some simple commands that will make your life as a p5 artist easier. The most basic of these is to start a small web server that runs locally on your machine. While you can use some parts of p5 without using a server, having one lets you use add-ons like `p5.sound` that use browser features which won't run without a server.

### Serving a Directory

To start a basic web server, navigate (on the command line) to the directory with the files you want to serve and run the command

```bash
p5 serve
```

This command starts a server in the current directory. You can now go to http://localhost:4444 (or http://127.0.0.1:4444 -- they mean the same thing) to see your files in the browser. Click on an HTML file that loads your p5 sketch, and you'll be good to go.

You can also specify a particular directory to serve. For example, if I'm on OSX and I've downloaded the [p5.js complete package](http://p5js.org/download/) from the p5 website and extracted that archive in my Downloads folder, I could use this command to start a server in the example project directory:

```bash
p5 serve Downloads/p5
```

If you do that you should be able to go to http://localhost:4444/empty-example/ and see a blank page. Add your own code to that example sketch, reload, and your sketch will show up in your browser.


### Running a Sketch File

Serving a directory is simple, but sometimes you may not want to bother with making an HTML file at all. The CLI is also designed to let you get started with nothing more than your `.js` sketch file.

Assuming that you have made a file called "mysketch.js" and that on the command line you've navigated to the same folder as that file, you can run

```bash
p5 serve mysketch.js
```

This will start a web server as usual, but when you visit http://localhost:4444, this time you'll see a custom HTML page that will auto-load P5 and the sketch file you specified. Write a sketch, save it as a .js file, serve that file with `p5 run`, and you're off!

### Options

#### Port

If you'd prefer to serve your sketch on a port other than 4444, just specify the `--port` option when starting the server: `p5 serve --port=8080`, for example.

#### "Serve" versus "Run"

Note that in all of these examples, `p5 run` can be substituted for `p5 serve`. Use whichever verb you prefer.

## Are We Missing a Command?

What would make this a useful tool for you? [Open an issue](https://github.com/kadamwhite/p5-cli/issues) if you have a request or suggestion!

## Have Fun!

p5-cli &copy; 2015 K. Adam White & released under the [MIT](./LICENSE) expat license.

[p5.js](https://github.com/processing/p5) is maintained through the Processing foundation, and used within this tool under the terms of the GPL license.
