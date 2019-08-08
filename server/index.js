const express = require('express');
const path = require('path');

const backendSever = express();

backendSever.use('/', express.static(path.resolve(__dirname, '../src')));


backendSever.listen(8080);

const cdnServer = express();

cdnServer.use('/', express.static(path.resolve(__dirname, '../src')));

cdnServer.listen(9090);