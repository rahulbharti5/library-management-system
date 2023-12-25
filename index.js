const chalk = require('chalk');
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const mainRouter = require('./routes.js');


// Use CORS middleware
app.use(cors({
   origin: ['http://localhost:5500'], // Replace with your frontend origin
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
   allowedHeaders: 'Content-Type',
 }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


// Middleware for logging request time
app.use((req, res, next) => {
   console.log(chalk.red("Request [" + req.method + "] :"), chalk.yellow(new Date()));
   console.log(chalk.red('User Agent:'), chalk.yellow(req.get('user-agent')));
   next();
});


app.use(express.static('public'));
app.get('/', function (req, res) {
   res.send("Well come to library mangement Sytem");
});
app.use("/", mainRouter);


// Start the server
app.listen(PORT, () => {
   console.log(chalk.green('Server listening on PORT'), chalk.cyan(PORT));
});

