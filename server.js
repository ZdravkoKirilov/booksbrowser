var express = require('express');
var path = require('path');

var app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendfile('public/index.html');
});

app.listen(3000, function() {
  console.log('example app listening on port 3000!');
});
