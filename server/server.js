const express = require('express');
const { Mongoose } = require('mongoose');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/user')
const app = express();

mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success connection');
            }
});
// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require apis
const productRoutes = require('./routes/product');
app.use('/api', productRoutes)

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on 3000");
    }
})