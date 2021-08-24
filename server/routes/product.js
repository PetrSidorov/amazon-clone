const router = require('express').Router();
const Product = require('../models/product');
// post request - new product
// category: { type: Schema.Types.ObjectId, ref: 'Category' },
// owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
// title: String,
// description: String,
// photo: String,
// price: Number,
// stockQuantity: Number,
// rating: [ Number ],
router.post('/products', async(req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.body.photo;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        await product.save();
        res.json({
            status: true,
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

// get request - get single product

// put request - update product

// delete request - delete single product

module.exports = router;