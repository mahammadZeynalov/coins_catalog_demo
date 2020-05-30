const router = require("express").Router();
const pool = require('../database');

router.get('/country', (req, res) => {
    const sql = `SELECT DISTINCT country FROM coins`;
    pool.query(sql, (err, data) => {
        if (!err) {
            res.json({
                data
            })
        } else {
            res.status(400).json({
                result: 0,
                message: 'Can not get coins properties'
            })
        }
    })
})

router.get('/metal', (req, res) => {
    const sql = `SELECT DISTINCT metal FROM coins`;
    pool.query(sql, (err, data) => {
        if (!err) {
            res.json({
                data
            })
        } else {
            res.status(400).json({
                result: 0,
                message: 'Can not get coins properties'
            })
        }
    })
})

router.get('/quality', (req, res) => {
    const sql = `SELECT DISTINCT quality FROM coins`;
    pool.query(sql, (err, data) => {
        if (!err) {
            res.json({
                data
            })
        } else {
            res.status(400).json({
                result: 0,
                message: 'Can not get coins properties'
            })
        }
    })
})

module.exports = router;