const router = require("express").Router();
const pool = require('../database');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.get('/', (req, res) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    result: 0,
                    message: "Invalid Token..."
                });
            } else {
                const sql = `SELECT * FROM cart WHERE userId = ${decoded.result.id}`
                pool.query(sql, (err, data) => {
                    if (err) {
                        res.json({
                            result: 0,
                            message: 'Database error!'
                        })
                    } else {
                        console.log('Cart data sended to user')
                        res.json(data);
                    }
                })
            }
        });
    } else {
        return res.json({
            result: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
})

router.post('/', (req, res) => {
    const sql = `INSERT INTO cart(userId, coinId)
                                value(?, ?)`
    pool.query(sql, [req.body.userId, req.body.coinId], (err, data) => {
        if (!err) {
            console.log('Coin added to the cart!');
            res.json({
                id: data.insertId,
                userId: req.body.userId,
                coinId: req.body.coinId
            })
        } else {
            res.status(400).json({
                result: 0,
                message: 'Database error!'
            })
            console.log(err);
        }
    })
})

module.exports = router;