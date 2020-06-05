//引入框架
const express = require('express');
const dispatch = require('./router');
const config = require('./config');  //自定义的要加./
const app = express();

app.use(dispatch);

app.listen(config.Port);

