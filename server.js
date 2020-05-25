require('dotenv').config();
const express = require('express');
const pool = require('./database');
const routerProperties = require('./properties');
const routerCart = require('./cart');
const routerCoins = require('./coins');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/image', express.static('upload/images'));

const port = process.env.APP_PORT;

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
});
app.use('/coins/properties', routerProperties);
app.use('/cart', routerCart);
app.use('/coins', routerCoins);

const cpUpload = upload.fields([{ name: 'image_averse' }, { name: 'image_reverse' }])
app.post('/coins', cpUpload, (req, res) => {
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

app.put('/coins/:id', cpUpload, (req, res) => {
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

app.post('/register', (req, res) => {
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

app.post('/login', (req, res) => {
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

app.get('/user', (req, res) => {
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

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
    console.log('Server is running on port ', port)
})

