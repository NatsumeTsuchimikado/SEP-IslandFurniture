var db = require('./databaseConfig.js');
var Promotion = require('./furniture.js');
var promotionDB = {
    getPromotionByCat: function (countryId, cat) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    var sql = 'SELECT p.ID as id, p.DISCOUNTRATE as discount, p.IMAGEURL as imageURL, i.SKU as sku, p.DESCRIPTION as description,'
                        + ' p.ENDDATE as endDate, p.STARTDATE as startDate, i.NAME as item, i.CATEGORY as category,'
                        + ' ic.RETAILPRICE * (1 - p.DISCOUNTRATE / 100) as discountPrice FROM itementity i, promotionentity p, item_countryentity ic where i.ID=p.ITEM_ID and'
                        + ' i.ID=ic.ITEM_ID and p.COUNTRY_ID=ic.COUNTRY_ID and i.ISDELETED=FALSE and p.COUNTRY_ID=? and i.CATEGORY=?';
                    conn.query(sql, [countryId, cat], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var promoList = [];
                            for (var i = 0; i < result.length; i++) {
                                var promo = new Promotion();
                                promo.id = result[i].id;
                                promo.item = result[i].item;
                                promo.imageURL = result[i].imageURL;
                                promo.sku = result[i].sku;
                                promo.description = result[i].description;
                                promo.startDate = result[i].startDate;
                                promo.endDate = result[i].endDate;
                                promo.category = result[i].category;
                                promo.price = result[i].discountPrice;
                                promoList.push(promo);
                            }
                            conn.end();
                            return resolve(promoList);
                        }
                    });
                }
            });
        });
    },


    getPromotionAllByCat: function (countryId, cat) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                } else {
                    // Updated SQL query to include filters for both category and countryId
                    var sql = 'SELECT p.ID as id, p.DISCOUNTRATE as discount, p.IMAGEURL as imageURL, i.SKU as sku, p.DESCRIPTION as description,' +
                        ' p.ENDDATE as endDate, p.STARTDATE as startDate, i.NAME as item, i.CATEGORY as category,' +
                        ' ic.RETAILPRICE * (1 - p.DISCOUNTRATE / 100) as discountPrice FROM itementity i, promotionentity p, item_countryentity ic' +
                        ' WHERE i.ID = p.ITEM_ID AND i.ID = ic.ITEM_ID AND p.COUNTRY_ID = ic.COUNTRY_ID AND i.ISDELETED = FALSE' +
                        ' AND p.COUNTRY_ID = ? AND i.CATEGORY = ?';
                    
                    conn.query(sql, [countryId, cat], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var promoList = [];
                            for (var i = 0; i < result.length; i++) {
                                var promo = new Promotion();
                                promo.id = result[i].id;
                                promo.item = result[i].item;
                                promo.imageURL = result[i].imageURL;
                                promo.sku = result[i].sku;
                                promo.description = result[i].description;
                                promo.startDate = result[i].startDate;
                                promo.endDate = result[i].endDate;
                                promo.category = result[i].category;
                                promo.price = result[i].discountPrice;
                                promoList.push(promo);
                            }
                            conn.end();
                            return resolve(promoList);
                        }
                    });
                }
            });
        });
    },
    
    getPromotionAll: function (countryId) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    // SQL query without time and category filters
                    var sql = 'SELECT p.ID as id, p.DISCOUNTRATE as discount, p.IMAGEURL as imageURL, i.SKU as sku, p.DESCRIPTION as description,'
                        + ' p.ENDDATE as endDate, p.STARTDATE as startDate, i.NAME as item, i.CATEGORY as category,'
                        + ' ic.RETAILPRICE * (1 - p.DISCOUNTRATE / 100) as discountPrice FROM itementity i, promotionentity p, item_countryentity ic'
                        + ' WHERE i.ID = p.ITEM_ID AND i.ID = ic.ITEM_ID AND p.COUNTRY_ID = ic.COUNTRY_ID AND i.ISDELETED = FALSE AND p.COUNTRY_ID = ?';

                    conn.query(sql, [countryId], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var promoList = [];
                            for (var i = 0; i < result.length; i++) {
                                var promo = new Promotion();
                                promo.id = result[i].id;
                                promo.item = result[i].item;
                                promo.imageURL = result[i].imageURL;
                                promo.sku = result[i].sku;
                                promo.description = result[i].description;
                                promo.startDate = result[i].startDate;
                                promo.endDate = result[i].endDate;
                                promo.category = result[i].category;
                                promo.price = result[i].discountPrice;
                                promoList.push(promo);
                            }
                            conn.end();
                            return resolve(promoList);
                        }
                    });
                }
            });
        });
    },


};
module.exports = promotionDB;