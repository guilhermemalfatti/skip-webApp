var express = require('express');
var app = express();
var Q = require('q');
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {   
    request('http://localhost:8080/retriveSongs/acdc', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = [];
            var responseParsed = JSON.parse(response.body);
            for(var i in responseParsed){
                var obj = {"name": responseParsed[i].name,
                            "id": responseParsed[i].id}
                result.push(obj);        
            }    
        }
        res.render('pages/index', {songs: result});
    })
});

app.get('/playlist', function(req, res) {    
    console.log('get playlist.');
    request('http://localhost:8080/getSongs', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = [];

            for(var i in JSON.parse(response.body)){
                var obj = {"name": JSON.parse(response.body)[i],
                        "id": i}
                result.push(obj);        
            }    
        }
        res.render('pages/playlist', {songs: result});
    })   
});


var port = process.env.PORT || 8090;
app.listen(port);

console.log("Http server listening on port", port);