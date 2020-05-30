const router = require("express").Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
require('dotenv').config();

router.post('/register', (req, res) => {
    const sql = `SELECT * FROM users WHERE email = ?`
    pool.query(sql, [req.body.email], (err, data) => {
        if (!err && data.length === 0) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = {
                name: req.body.name,
                email: req.body.email,
                hash: hash,
                isAdmin: req.body.isAdmin
            };
            const sql = `INSERT INTO users (name, email, password, isAdmin)
                VALUES(?, ?, ?, ?)`
            pool.query(sql, [user.name, user.email, user.hash, user.isAdmin], (err, data) => {
                if (!err) {
                    const jsonToken = sign({ result: data }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    res.json({
                        id: data.insertId,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: jsonToken
                    })
                    console.log('A new user has been registred');
                } else {
                    res.status(400).json({
                        result: 0,
                        message: 'Database error!'
                    })
                    console.log(err);
                }
            })
        } else {
            res.status(400).json({
                result: 0,
                message: 'The user with the same email is already exist!'
            })
        }
    })
});

router.post('/login', (req, res) => {
    const sqlCheckEmail = `SELECT * FROM users WHERE email = ?`;
    pool.query(sqlCheckEmail, [req.body.email], (err, data) => {
        if (!err && data.length !== 0) {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (isPasswordCorrect) {
                const jsonToken = sign({ result: data[0] }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                res.json({
                    id: data[0].id,
                    name: data[0].name,
                    email: data[0].email,
                    isAdmin: data[0].isAdmin,
                    token: jsonToken
                })
            } else {
                res.status(400).json({
                    result: 0,
                    message: 'The password is incorrect!'
                })
            }
        } else {
            res.status(400).json({
                result: 0,
                message: 'There is no user with such email!'
            })
            console.log(err);
        }
    })
});

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
                const { id, name, email, isAdmin } = decoded.result
                return res.json({
                    id, name, email, isAdmin, token
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

module.exports = router;