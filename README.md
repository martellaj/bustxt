# TypeScript Node seed
> This is a simple seed (which may grow into a sapling) that serves as the roots for a Node application written in TypeScript that can be deployed to Azure.

## Getting started
To get started building with this seed, just run `npm install` from the command line. This will install any npm dependencies, followed by installing any typings required by the project.

## TypeScript
* During development, run the build task (specified in *.vscode/tasks.json*) in VS Code. This will run the *tsc* tool continuously, watching for any code changes and immediately compiling new JavaScript.
* Compilation options are specified in *tsconfig.json*.
* TypeScript code (which you should edit) can be found in the *source/* directory.
* Compiled JavaScript code (which you shouldn't edit) gets placed in a *bin/* directory.

## Azure
* **Important**: To deploy this code as is, it's required to edit the *web.config* file located in *site/wwwroot* which is available to edit via FTP. The problem is that Azure looks for a server.js or app.js in the project's root, but the server.js this seed uses is in the *bin/* directory. So in *web.config*, find the rule dealing with `DynamicContent` and edit the `Rewrite` action's `url` to use this path instead. 
* Located in this seed is a *IISNode.yml* file, which Azure reads for instructions. This line, `loggingEnabled: true`, captures any console logging the application does and writes it to logs available through FTP.
* To get the FTP location, go to **Settings > Properties** in the Azure portal. Application logs can be found in *LogFiles/Application*.