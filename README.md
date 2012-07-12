#Fancy Timestamp

Use this to create natural language for your unix timestamps (similar to Facebook's)

#Usage

```javascript
var fancyTimestamp = require('/client/fancyTimestamp');

var normalTimestamp = 1342123755;
var javascriptTimestamp = (new Date()).getTime();

var fancyTimestampString = fancyTimestamp(normalTimestamp); // == "8 minutes ago"

fancyTimestampString = fancyTimestamp(javascriptTimestamp, true); // == "Just Now!"
```

#License
<a href="http://www.opensource.org/licenses/mit-license.php/">MIT license</a>