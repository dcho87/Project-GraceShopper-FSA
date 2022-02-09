const router = require("express").Router();
const { models: { User, Product, Order, OrderProduct }} = require('../db')
module.exports = router


//route to GET All Orders
router.get('/', async (req, res, next) => {
    try {
        res.send(await Order.findAll())
    }
    catch(ex){
        next(ex)
    }
})

//route to GET an Order by orderId 
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

// route to ADD a Product to an Order
router.put('/:id', async (req, res, next) => {
    try {
        //find an order and product
        const order = await Order.findByPk(req.params.id) || {}
        const product = await Product.findByPk(req.body.id) || {}

        //find or create an associate between order and product
        const [orderProduct] = await OrderProduct.findOrCreate({
            where: {
                orderId: req.params.id,
                productId: req.body.id
            }
        })

        await order.update({
            totalItems: 1,
            totalPrice: product.price
        })

        orderProduct.update()

        res.send(order)
    }
    catch(ex){
        next(ex)
    }
})

//TO DO
// Update Order