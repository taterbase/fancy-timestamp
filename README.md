#Fancy Timestamp

Use this to create natural language for your unix timestamps (similar to Facebook's)

Plays well with [browserify](https://github.com/substack/node-browserify)

#Usage

```javascript
var fancyTimestamp = require('fancy-timestamp'); //fancyTimestamp(timestamp, /* milliseconds */);

var normalTimestamp = 1342123755; //Uses seconds
var javascriptTimestamp = (new Date()).getTime(); //Uses milliseconds

var fancyTimestampString = fancyTimestamp(normalTimestamp); // == "8 minutes ago"

fancyTimestampString = fancyTimestamp(javascriptTimestamp, true); // == "Just Now!"
```

#License
<a href="http://www.opensource.org/licenses/mit-license.php/">MIT license</a>