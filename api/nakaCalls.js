/**
 * Created by WEREM on 5/8/16.
 */
var http = require("http");
var https = require("https");

var that = this;

module.exports = {
    celery_access_token: 'FAKE_CELERY',
    getProducts: getProducts,
    getJSON: getJSON
};

function getProducts(req, res, next) {
    var options = {
        host: 'www.nakaoutdoors.com.ar',
        port: 80,
        path: '/webservices/categoria.json?id=0&max=9999&offset=1&order=1',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'CELERY_BLUE',
        }
    };
    getJSON(options, function(statusCode, result)
    {
        // I could work with the result html/json here.  I could also just return it
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
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