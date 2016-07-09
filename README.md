# bustxt

> Simple service to notify my wife via SMS if her bus is late or not so she doesn't have to open an app.

![](https://raw.githubusercontent.com/martellaj/bustxt/master/bustxt.gif)

## Development
* Run `npm install` to install dependencies.
* Run `typings install` to install typings for development.
* Run the build task in *.vscode/tasks.json* to do continuous TypeScript to JavaScript compilation.
* Edit code in the *source/* directory, and leave the code in *bin/* untouched.
* To get access to logs, connect to the FTP location which can be found in **Settings > Properties** of the Azure portal.

## Acknowledgements
* [twilio-node](https://twilio.github.io/twilio-node/) - Makes sending SMS messages programmatically simple as pie.
* [OneBusAway API](http://pugetsound.onebusaway.org/p/OneBusAwayApiService.action) - Provides real-time public transportation data reliably.

## License
MIT © [Joe Martella](http://www.martellaj.github.io)