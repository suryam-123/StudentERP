const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let classRouter = require('./routes/classRoutesApi');
let studentRouter = require('./routes/studentRoutesApi');
let parentRouter = require('./routes/parentDataRoutesApi');
let combinedApi = require('./routes/combinedRoutesApi');
app.use('/',classRouter);
app.use('/',studentRouter);
app.use('/',parentRouter);
app.use('/',combinedApi);
app.listen(4500,function() {
    console.log('Node started');
});