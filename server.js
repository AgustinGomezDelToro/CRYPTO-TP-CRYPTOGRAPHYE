/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , path = require('./routes')
  , http = require('http');

// template engine
var hbs = require('hbs');

var crypto = require('crypto');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3333);

app.use(express.static('public'));
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views/html');
app.set('view engine', 'html');


// ROUTE HANDLING
app.get('/', function(req, res){

   res.render('index.html', { title: 'Express' });
})


app.get('/index512', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/html/index512.html'));
  });

app.get('/MD5', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/html/MD5.html'));
    });


app.get('/ripemd160', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/html/ripemd160.html'));
    });

    
app.get('/encriptar/encrip',function(req,response){

    console.log(req.param);
    var frase= req.query.frase;
    var pass= req.query.pass;
    var res;
    encrypt(frase, pass, function (encoded) {
        console.log(encoded);
        res=encoded;
        
    });

    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({respuesta:res}));

});


app.get('/encriptar/decrip',function(req,response){
    var resultado= req.query.resultado.replace(/\s/g,"+");
    var pass= req.query.pass;
    var res;

    decrypt(resultado, pass, function (encoded) {
        console.log(encoded);
        res=encoded;
        
    });

     response.writeHead(200, { 'Content-Type': 'application/json'});
     response.end(JSON.stringify({respuesta:res}));

});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Listen to port  " + app.get('port'));
});



var encrypt = function (input, password, callback) {
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    var data = new Buffer(input, 'utf8').toString('binary');

    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));

    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var encrypted;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    } else {
        encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
    }

    var encoded = new Buffer(encrypted, 'binary').toString('base64');

    callback(encoded);
};

var decrypt = function (input, password, callback) {
    // Convert urlsafe base64 to normal base64
    var input = input.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    var edata = new Buffer(input, 'base64').toString('binary')

    // Create key from password
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    // Decipher encrypted data
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));


    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var decrypted, plaintext;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {  
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');    
        plaintext = new Buffer(decrypted, 'binary').toString('utf8');
    } else {
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }

    callback(plaintext);
};
