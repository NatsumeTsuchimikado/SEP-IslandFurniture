var express = require('express');
var app = express();
var promotion = require('../model/promotionModel.js');

app.get('/api/getPromotionByCat', function (req, res) {
    var cat = req.query.cat;
    var countryId = req.query.countryId;
    promotion.getPromotionByCat(countryId, cat)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get promotion by category");
        });
});

app.get('/api/getPromotionAll', function (req, res) {
    var countryId = req.query.countryId;
    promotion.getPromotionAll(countryId)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get promotion by category");
        });
});
module.exports = app;