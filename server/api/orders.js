const router = require("express").Router();
const {
  models: { User, Product, Order, OrderProduct },
} = require("../db");
module.exports = router;

//route to GET All Orders
router.get("/", async (req, res, next) => {
  try {
    res.send(await Order.findAll());
  } catch (ex) {
    next(ex);
  }
});

//route to GET an Order by orderId
router.get("/:id", async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id, {
      include: Product,
    });
    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

// route to ADD a Product to an Order
router.put("/:id", async (req, res, next) => {
  try {
    //find an order and product
    const order = (await Order.findByPk(req.params.id)) || {};
    const product = (await Product.findByPk(req.body.id)) || {};
    let count = req.body.itemCount || 1;

    //find or create an associate between order and product
    const [orderProduct] = await OrderProduct.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: req.body.id,
      },
    });

    orderProduct.update({
      itemCount: orderProduct.itemCount + count,
    });

    await order.update({
      totalItems: order.totalItems + count,
      totalPrice: order.totalPrice + product.price * count,
    });

    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

//route to Update Order
router.put("/update", async (req, res, next) => {
  try {
    const { order, product, itemCount } = req.body;

    //find the OrderProduct for active order
    const lineProduct = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId: product.id,
      },
    });

    const orderDB = await Order.findOne({
      where: {
        orderId: order.id,
      },
    });

    await lineProduct.update({
      itemCount: itemCount,
    });
    await orderDB.update({
      totalPrice: itemCount * product.price,
    });

    res.send(await Order.findByPk(order.id, { include: Product }));
  } catch (ex) {
    next(ex);
  }
});
