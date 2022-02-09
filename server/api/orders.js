const router = require("express").Router();
const { models: { User, Product, Order, CompletedOrder }} = require('../db')
module.exports = router


// get all orders
router.get('/', async (req, res, next) => {
    try {
        res.send(await Order.findAll())
    }
    catch(ex){
        next(ex)
    }
})

// get order by order id 
router.get('/:id', async (req, res, next) => {
    try{
        let order = await Order.findByPk(req.params.id, {
            include: Product
        })
        res.send(order)
    }
    catch(ex){
        next(ex)
    }
})

// add a product to cart
router.put('/:id', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        const productId = req.body.id
        
        const product = await Product.findByPk(productId)


    }
    catch(ex){
        next(ex)
    }
})