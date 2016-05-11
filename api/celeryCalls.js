/**
 * Created by WEREM on 5/8/16.
 */
var http = require("http");
var https = require("https");
var url = require('url');
var globals = require('./globals');
var that = this;



module.exports = {
    getProducts: getProducts,
    getJSON: getJSON
};



function getProducts(req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query);
    console.log(globals);
    var options = {
        host: 'api-sandbox.trycelery.com',
        port: 443,
        path: '/v2/products/' + query.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': globals.token
        }
    };
    getJSON(options, function(statusCode, result)
    {
        // I could work with the result html/json here.  I could also just return it
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
        res.set('Access-Control-Allow-Origin', '*');
        res.send(result);
    });
}

function getJSON (options, onResult) {
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function (res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function (err) {
        console.log(err);
        onResult('error: ' + err.message);
    });

    req.end();

}