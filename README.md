#Fancy Timestamp

Use this to create natural language for your unix timestamps (similar to Facebook's)

Plays well with [browserify](https://github.com/substack/node-browserify)

#Usage
Install with NPM and require where needed.
```bash
npm install fancy-timestamp
```
```javascript
var fancyTimestamp = require('fancy-timestamp');
```
Fancy Timestamp can accept normal timestamps composed of seconds.
```javascript
var normalTimestamp = 1342123755; //Using only seconds

var fancyTimestampString = fancyTimestamp(normalTimestamp); // result == "8 minutes ago"
```
It can also accept timestamps composed of milliseconds such as the ones JavaScript defaults to. To parse millisecond timestamps pass a second parameter of 'true'.
```javascript
var javascriptTimestamp = (new Date()).getTime(); //Using JavaScript's timestamp composed of milliseconds

fancyTimestampString = fancyTimestamp(javascriptTimestamp, true); // result == "Just Now!"
```

#License
<a href="http://www.opensource.org/licenses/mit-license.php/">MIT license</a>