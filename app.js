/**
 @author Nasir
 */

const express = require("express");
const app = express();
const cors = require('cors')
const path = require('path');
var filter = require('content-filter');
const sanitizer = require('sanitize')();
const bodyParser = require("body-parser");
const layouts = require('express-ejs-layouts');
// const dbService = require("./services/db_services");
const emailService = require('./services/emailService')
// const contactService = require("./services/contactService");
var urlencodedParser = bodyParser.urlencoded({extended: false})
var logger = require('logger').createLogger('logs.log'); // logs to a file

// set body parser
app.use(bodyParser.json());

// set content filter
app.use(filter())

// set views
app.set('view engine', 'ejs');

// set assets path
app.use(express.static(path.join(__dirname, 'assets')));

// set layout
app.use(layouts);

// db connection
app.use(function (req, res, next) {
    res.locals.connection = dbService.connection;
    next();
});

// enable cors
app.use(cors())

app.get("/test", function (req, res) {
    res.json({
        message: "hello"
    });
});

app.get('/', function (req, res) {
    logger.info(req.socket.remoteAddress);
    res.render('index')
})

app.get('/contact', function (req, res) {
    logger.info(req.socket.remoteAddress);
    res.render('index')
})

app.post('/contact', urlencodedParser, function (req, res) {
        // console.log(req.body)
        var message = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        }
        console.log(JSON.stringify(message))
        emailService.sendMail(message)
        res.redirect("/")
    }
);

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
