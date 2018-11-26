/**
 * Created by adventis on 11/22/18.
 */

const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
const app = express()
const config = require('./config')
var fs = require('fs');
var https = require('https');
var http = require('http');


var privateKey  = fs.readFileSync('./key.pem');//fs.readFileSync('private.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var certificate = fs.readFileSync('./cert.pem');//fs.readFileSync('mydomain.csr', 'utf8');

var options = {key: privateKey, cert: certificate};


// var key = fs.readFileSync('private.key');
// var cert = fs.readFileSync( 'primary.crt' );
// var ca = fs.readFileSync( 'intermediate.crt' );
//
//
// var options = {
//     key: key,
//     cert: cert,
//     ca: ca
// };


app.use(function(req, res, next) {
    console.log(req.secure)
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('etag');


app.use(require('./custom_routing'));
// app.use(require('./okta_oauth_routing'));


// app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))

https.createServer(options, app).listen(443);
http.createServer(app).listen(80);
