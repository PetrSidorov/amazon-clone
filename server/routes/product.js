const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

// post request - new product

router.post('/products', upload.single('photo'), async(req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        await product.save();

        res.json({
            success: true,
            message: 'Success save product',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

});

// get request - get all products

router.get('/products', async (req, res) => {
    try {

        let products = await Product.find();
        res.json({
            products: products,
            success: true,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

// get request - get single product


router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        res.json({
            product: product,
            success: true,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// put request - update product

router.put('/products/:id', upload.single('photo'), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.category,
                photo: req.body.photo,
                description: req.body.description,
                owner: req.body.ownerID,
            }
        },
        { upsert: true }
        );
        res.json({
            updatedProduct: product,
            success: true,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
// delete request - delete single product

router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
        if (deletedProduct) {
            res.json({
                status: true,
                message: 'Success delete'
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;