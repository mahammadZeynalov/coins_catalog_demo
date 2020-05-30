const router = require("express").Router();
const pool = require('../database');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
});

const cpUpload = upload.fields([{ name: 'image_averse' }, { name: 'image_reverse' }])

router.post('/', cpUpload, (req, res) => {
    const sql = `INSERT INTO coins(name, face_value, issue_year,
                                    price, country, metal, short_description,
                                    full_description, quality, weight, coin_type, image_averse, image_reverse)
                                    VALUES(?, ? ,? , ?, ?, ? ,? , ?, ?, ? , ?, ?, ?)`
    const data = req.body
    pool.query(sql,
        [data.name,
        data.face_value,
        data.issue_year,
        data.price,
        data.country,
        data.metal,
        data.short_description,
        data.full_description,
        data.quality,
        data.weight,
        data.coin_type,
        req.files['image_averse'][0].filename,
        req.files['image_reverse'][0].filename],
        (err, data) => {
            if (!err) {
                res.json(data);
                console.log('Coin added to database')
            } else {
                res.status(400).json({
                    result: 0,
                    message: 'Impossible to upload the coin'
                })
                console.log(err);
            }
        })
})

router.put('/:id', cpUpload, (req, res) => {
    const data = req.body;
    const idOfCoin = req.params.id
    const sql = `UPDATE coins SET name = ?, face_value = ?, issue_year = ?,
                    price = ?, country = ?, metal = ?, short_description = ?,
                    full_description = ?, quality = ?, weight = ?, coin_type = ?, image_averse = ?, image_reverse = ?
                    WHERE id = ${idOfCoin}`

    pool.query(sql,
        [
            data.name,
            data.face_value,
            data.issue_year,
            data.price,
            data.country,
            data.metal,
            data.short_description,
            data.full_description,
            data.quality,
            data.weight,
            data.coin_type,
            req.files['image_averse'][0].filename,
            req.files['image_reverse'][0].filename], (err, data) => {
                if (!err) {
                    res.json(req.body);
                    console.log('Coin has been updated');
                } else {
                    res.status(400).json({
                        result: 0,
                        message: 'Impossible to change the coin'
                    });
                    console.log(err);
                }
            })
});

router.post('/filter', (req, res) => {
    if (req.body.type !== '') {
        let sql = `SELECT * FROM coins WHERE coin_type = '${req.body.type}'`
        const start = req.body.pageSize * (req.body.currentPage - 1);
        const end = req.body.pageSize * req.body.currentPage;
        const count = sql.replace('*', `count(id) as count`);
        sql += ` ORDER BY id DESC LIMIT ${start}, ${req.body.pageSize}`;
        pool.query(sql, (err, data) => {
            if (!err) {
                pool.query(count, (error, dataCount) => {
                    if (!err) {
                        let paginated = data
                        res.json({
                            paginated,
                            length: dataCount[0].count
                        })
                    }
                })

            } else {
                console.log(err);
                console.log('asdf')
                res.json({
                    result: 0,
                    message: 'Can not get coins'
                })
            }
        })


    } else {
        delete req.body.conditions.isVisible
        const { country, metal, quality, priceFrom, priceTo, yearFrom, yearTo } = req.body.conditions;
        const info = req.body.conditions;

        country ? info.country = `country = '${country}'` : '';
        metal ? info.metal = `metal = '${metal}'` : '';
        quality ? info.quality = `quality = '${quality}'` : '';
        priceFrom ? info.priceFrom = `price >= ${priceFrom}` : '';
        priceTo ? info.priceTo = `price <= ${priceTo}` : '';
        yearFrom ? info.yearFrom = `issue_year >= ${yearFrom}` : '';
        yearTo ? info.yearTo = `issue_year <= ${yearTo}` : '';
        const gotValues = Object.values(info);
        let sql = '';
        if (gotValues.every(el => el === '')) {
            sql = `SELECT * FROM coins`
        } else {
            const result = gotValues.filter(value => value !== '')
            const where = result.join(' AND ');
            sql = `SELECT  * FROM coins
    WHERE ${where}`
        }

        const text = req.body.text;

        if (sql === `SELECT * FROM coins`) {
            sql += ` WHERE name LIKE '%${text}%'
                OR short_description LIKE '%${text}%'
                OR full_description LIKE '%${text}%'`
        } else {
            sql += ` AND (name LIKE '%${text}%'
        OR short_description LIKE '%${text}%'
        OR full_description LIKE '%${text}%')`
        }

        const start = req.body.pageSize * (req.body.currentPage - 1);
        const end = req.body.pageSize * req.body.currentPage;

        const count = sql.replace('*', `count(id) as count`);
        sql += ` ORDER BY id DESC LIMIT ${start}, ${req.body.pageSize}`
        pool.query(sql, (err, data) => {
            if (!err) {
                pool.query(count, (error, dataCount) => {
                    if (!err) {
                        let paginated = data
                        res.json({
                            paginated,
                            length: dataCount[0].count
                        })
                    }
                })

            } else {
                console.log(err);
                console.log('asdf')
                res.json({
                    result: 0,
                    message: 'Can not get coins'
                })
            }
        })
    }
})


router.get('/type/:type', (req, res) => {

})

router.get('/:id', (req, res) => {
    const idOfCoin = req.params.id;
    const sql = `SELECT * FROM coins WHERE id = ${idOfCoin}`;
    pool.query(sql, (err, data) => {
        if (!err && data.length !== 0) {
            res.json(data[0]);
        } else {
            res.status(400).json({
                result: 0,
                message: 'Impossible to get the coin'
            });
        }
    })
});

router.delete('/:id', (req, res) => {
    const idOfCoin = req.params.id;
    const sql = `DELETE FROM coins WHERE id = ${idOfCoin}`;
    pool.query(sql, (err, data) => {
        if (!err) {
            res.json(data);
            console.log('Coin has been deleted')
        } else {
            res.status(400).json({
                result: 0,
                message: 'Can not delete the coin!'
            })
            console.log(err);
        }
    })
})

module.exports = router;