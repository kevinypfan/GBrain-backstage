const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');

var app = express();
app.use(history());
app.use(express.static(path.resolve(__dirname, './dist')));

app.listen(5000, () => {
  console.log('port 5000');
})
