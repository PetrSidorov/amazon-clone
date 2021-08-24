const express = require('express');
const { Mongoose } = require('mongoose');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb+srv://root:gE4KAGPi2Jm6dzrx@amazon-clone.noxfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

app.get('/', (req, res) => {
    res.json('Hello test');
});

app.post('/', (req, res) => {
    console.log((req.body.name));
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("listening on 3000");
    }
})