const router = require("express").Router();
const { models: { User, Product, Order, CompletedOrder }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        res.send(await Order.findAll())
    }
    catch(ex){
        next(ex)
    }
})