require('dotenv').config();
const express = require('express');
const routerProperties = require('./routers/properties');
const routerCart = require('./routers/cart');
const routerCoins = require('./routers/coins');
const routerUser = require('./routers/user');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/image', express.static('upload/images'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/coins/properties', routerProperties);
app.use('/cart', routerCart);
app.use('/coins', routerCoins);
app.use('/user', routerUser);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log('Server is running on port ', port)
})

