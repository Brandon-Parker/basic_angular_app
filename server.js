const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build')).listen(5000, () => {
  console.log('spinnin server on 5000');
});
