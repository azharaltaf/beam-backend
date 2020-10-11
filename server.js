require('dotenv').config();

const compression = require('compression')

var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  config = require('./config/config')

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.options('*', cors());

let port = process.env.PORT;
if (port == null || port == "") {
  port = config.express.port;
}
var server = app.listen(port);
server.setTimeout(600000);
app.use(cors({ credentials: true, origin: true }))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./Routes').router;

const LoggerMiddleware = (req, res, next) =>{
  console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`)
  
  next();
}

app.use(LoggerMiddleware);

app.use('/', routes);