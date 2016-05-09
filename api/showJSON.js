// tools.js
// ========
module.exports = {
    showJSONfunction: function (req, res, next) {
        console.log("json!");
        res.send('Hello from AJSON!');
    }
};