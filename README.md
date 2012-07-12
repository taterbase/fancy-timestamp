#Fancy Timestamp

Use this to create natural language for your unix timestamps (similar to Facebook's)

```javascript
var fancyTimestamp = require('/client/fancyTimestamp');

var normalTimestamp = 1342123755;
var javascriptTimestamp = (new Date()).getTime();

var fancyTimestampString = fancyTimestamp(normalTimestamp); // == "8 minutes ago"

fancyTimestampString = fancyTimestamp(javascriptTimestamp, true); // == "Just Now!"
```