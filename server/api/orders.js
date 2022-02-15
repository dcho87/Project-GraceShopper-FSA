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
// router.put("/:id", async (req, res, next) => {
//   try {
//     //find an order and product
//     const order = (await Order.findByPk(req.params.id)) || {};
//     const product = (await Product.findByPk(req.body.id)) || {};
//     let count = req.body.itemCount;

//     //find or create an associate between order and product
//     const [orderProduct] = await OrderProduct.findOrCreate({
//       where: {
//         orderId: req.params.id,
//         productId: req.body.id,
//       },
//     });

//     orderProduct.update({
//       itemCount: orderProduct.itemCount + count,
//     });

//     await order.update({
//       totalItems: order.totalItems + count,
//       totalPrice: order.totalPrice + product.price * count,
//     });

//     res.send(order);
//   } catch (ex) {
//     next(ex);
//   }
// });

router.put("/:id", async (req, res, next) => {
  try {
    //find an order and product
    const order = (await Order.findByPk(req.params.id)) || {};
    const orderInfo = req.body;

    //find or create an associate between order and product
    const [orderProduct] = await OrderProduct.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: orderInfo.productId,
      },
    });

    orderProduct.update({
      itemCount: (orderProduct.itemCount += orderInfo.totalItems),
    });

    await order.update({
      totalItems: (order.totalItems += orderInfo.totalItems),
      totalPrice: (order.totalPrice += orderInfo.totalPrice),
    });

    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

//route to Update Order
router.put("/deleteOrder/:id", async (req, res, next) => {
  try {
    const order = req.body;
    console.log("order details", order);
    // console.log("order in api route", order);
    const productId = req.body.productIdToRemove;
    // console.log("productId", productId);
    // const { order, product, itemCount } = req.body;

    const productDetails = order.products.find(
      (product) => product.id === productId
    );

    const productAmount = productDetails.price;
    const productQuantity = productDetails.orderproduct.itemCount;
    const currentInventory = productDetails.inventory;

    console.log("productDetails", productDetails);
    console.log("productAmount", productAmount);
    console.log("productQuantity", productQuantity);
    console.log("currentInventory", currentInventory);

    //find the Products for Active Order
    const lineProduct = await OrderProduct.findOne({
      where: {
        orderId: order.id,
        productId,
      },
    });

    // console.log("lineProduct", lineProduct);
    await lineProduct.destroy();

    //delete Product if itemCount is 0
    // if (itemCount === 0) {
    //
    // } else {
    //   await lineProduct.update({
    //     itemCount: itemCount,
    //   });
    // }

    //find the Active Order
    const orderDB = await Order.findOne({
      where: {
        id: order.id,
      },
    });

    console.log("orderDB", orderDB);

    orderDB.totalItems -= productQuantity;
    orderDB.totalPrice -= productAmount * productQuantity;
    order.totalItems -= productQuantity;
    order.totalPrice -= productAmount * productQuantity;

    console.log("order after updates", orderDB);
    await orderDB.update();

    // const newTotalPrice = orderDB.totalPrice + product.price * itemCount;
    // const newTotalItems = orderDB.totalItems + (itemCount - orderDB.totalItems);

    // await orderDB.update({
    //   totalPrice: newTotalPrice,
    //   totalItems: newTotalItems,
    // });

    res.send(order);
  } catch (ex) {
    next(ex);
  }
});
