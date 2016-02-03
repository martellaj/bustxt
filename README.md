# TypeScript Node seed
> This is a simple seed (which may grow into a sapling) that serves as the roots for a Node application written in TypeScript that can be deployed to Azure.

## Getting started
* Run `npm install` to install dependencies.
* Run `typings install` to install typings for development.

## TypeScript
* During development, run the build task (specified in *.vscode/tasks.json*) in VS Code. This will run the *tsc* tool continuously, watching for any code changes and immediately compiling new JavaScript.
* Compilation options are specified in *tsconfig.json*.
* TypeScript code (which you should edit) can be found in the *source/* directory.
* Compiled JavaScript code (which you shouldn't edit) gets placed in a *bin/* directory.

## Azure
* The *web.config* file is specific to this application's structure. If at any time the structure of *bin/* changes, it'll need to be updated to correctly point to *server.js*.
* Located in this seed is a *IISNode.yml* file, which Azure reads for instructions. This line, `loggingEnabled: true`, captures any console logging the application does and writes it to logs available through FTP.
* To get the FTP location, go to **Settings > Properties** in the Azure portal. Application logs can be found in *LogFiles/Application*.