const express = require('express');
const path = require('path');

const backendSever = express();

backendSever.use((req, res, next) => {
  if (req.url.indexOf('.pdf') > -1) {
    setTimeout(() => next(), 0)
  } else {
    next();
  }
})

backendSever.use('/', express.static(path.resolve(__dirname, '../src')));


backendSever.listen(8081);

const cdnServer = express();

cdnServer.use('/', express.static(path.resolve(__dirname, '../src')));

cdnServer.listen(9090);