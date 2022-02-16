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
    const orderInfo = req.body;
    console.log("orderInfo", orderInfo);
    // const order = (await Order.findByPk(req.params.id)) || {};
    // console.log("order", order);
    // const orderInfo = req.body;
    // console.log("orderInfo", orderInfo);
    // const productId = orderInfo.productId;
    // console.log("productId", productId);
    // const productDetails =
    //   order.products &&
    //   order.products.find((product) => product.id === productId);
    // console.log("productDetails", productDetails);
    // // const productDB = await Product.findByPk(productDetails.id);
    // //find an order and product
    // console.log("orderInfo", orderInfo);

    // //find or create an associate between order and product
    // const [orderProduct] = await OrderProduct.findOrCreate({
    //   where: {
    //     orderId: req.params.id,
    //     productId: orderInfo.productId,
    //   },
    // });

    let order,
      productId,
      productDetails,
      orderProduct,
      productAmount,
      productQuantity,
      currentInventory,
      lineProduct,
      orderDB,
      productDB;

    switch (orderInfo.type) {
      case "add":
        orderInfo.inventoryCountOG = productQuantity;
        order = (await Order.findByPk(req.params.id)) || {};
        //find or create an associate between order and product
        [orderProduct] = await OrderProduct.findOrCreate({
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
        break;
      case "update":
        productId = orderInfo.productId;
        console.log("productId", productId);

        productDetails = orderInfo.products.find(
          (product) => product.id === productId
        );
        console.log("productDetails", productDetails);

        productAmount = productDetails.price;
        console.log("productAmount", productAmount);

        productQuantity = productDetails.orderproduct.itemCount;
        console.log("productQuantity", productQuantity);

        currentInventory = productDetails.inventory;
        console.log("currentInventory", currentInventory);

        //find the Products for Active Order
        lineProduct = await OrderProduct.findOne({
          where: {
            orderId: orderInfo.id,
            productId,
          },
        });
        console.log("lineProduct before update", lineProduct);

        await lineProduct.update({
          itemCount: orderInfo.orderUpdateTotalItems,
        });

        console.log("lineProduct after update", lineProduct);

        // const itemIncrease =
        //   productQuantity < orderInfo.orderUpdateTotalItems ? true : false;

        // console.log("item increase", itemIncrease);

        // console.log();

        // const difference = orderInfo.orderUpdateTotalItems - productQuantity;

        // console.log("difference", difference);

        // //find the Active Order
        // orderDB = await Order.findByPk(orderInfo.id);
        // console.log("orderDB", orderDB);
        // productDB = await Product.findByPk(productDetails.id);
        // console.log("productDB", productDB);

        // console.log("item increase", itemIncrease);

        // await productDB.update({
        //   inventory: productDB.inventory - difference,
        // });

        // await orderDB.update({
        //   totalItems: orderDB.totalItems + difference,
        //   totalPrice: orderDB.totalPrice - productAmount * productQuantity,
        // });
        // console.log("productDB after update", productDB);
        // console.log("orderDB after update", orderDB);

        // orderInfo.totalItems + difference;
        // orderInfo.totalPrice = productAmount * productQuantity;

        break;
      case "delete":
        productId = orderInfo.productId;
        productDetails = orderInfo.products.find(
          (product) => product.id === productId
        );
        productAmount = productDetails.price;
        productQuantity = productDetails.orderproduct.itemCount;
        currentInventory = productDetails.inventory;

        //find the Products for Active Order
        lineProduct = await OrderProduct.findOne({
          where: {
            orderId: orderInfo.id,
            productId,
          },
        });
        await lineProduct.destroy();

        //find the Active Order
        orderDB = await Order.findByPk(orderInfo.id);
        productDB = await Product.findByPk(productDetails.id);

        await orderDB.update({
          totalItems: orderDB.totalItems - productQuantity,
          totalPrice: orderDB.totalPrice - productAmount * productQuantity,
        });

        await productDB.update({
          inventory: productDB.inventory + productQuantity,
        });

        orderInfo.totalItems -= productQuantity;
        orderInfo.totalPrice -= productAmount * productQuantity;

        break;
      default:
        throw "ERROR: orderInfo TYPE not identified in the PUT router";
        break;
    }

    res.send(orderInfo);
  } catch (ex) {
    next(ex);
  }
});

// router.put("/update/:id", async (req, res, next) => {
//   try {
//     //find an order and product
//     console.log(req.body);
//     const order = (await Order.findByPk(req.params.id)) || {};
//     const orderInfo = req.body;
//     console.log("router, order", order);
//     console.log("router, orderInfo", orderInfo);

//     //find or create an associate between order and product
//     // const [orderProduct] = await OrderProduct.findOrCreate({
//     //   where: {
//     //     orderId: req.params.id,
//     //     productId: orderInfo.productId,
//     //   },
//     // });

//     // orderProduct.update({
//     //   itemCount: (orderProduct.itemCount += orderInfo.totalItems),
//     // });

//     // await order.update({
//     //   totalItems: (order.totalItems += orderInfo.totalItems),
//     //   totalPrice: (order.totalPrice += orderInfo.totalPrice),
//     // });

//     // res.send(order);
//   } catch (ex) {
//     next(ex);
//   }
// });

//route to Update Order
// router.put("/deleteOrder/:id", async (req, res, next) => {
//   try {
//     const order = req.body;
//     console.log("order from delete", order);
//     const productId = req.body.productId;
//     const productDetails = order.products.find(
//       (product) => product.id === productId
//     );
//     const productAmount = productDetails.price;
//     const productQuantity = productDetails.orderproduct.itemCount;
//     const currentInventory = productDetails.inventory;

//     //find the Products for Active Order
//     const lineProduct = await OrderProduct.findOne({
//       where: {
//         orderId: order.id,
//         productId,
//       },
//     });
//     await lineProduct.destroy();

//     //find the Active Order
//     const orderDB = await Order.findByPk(order.id);
//     console.log("orderDB", orderDB);
//     const productDB = await Product.findByPk(productDetails.id);
//     console.log("productDB", productDB);

//     await productDB.update({
//       inventory: productDB.inventory + productQuantity,
//     });

//     await orderDB.update({
//       totalItems: orderDB.totalItems - productQuantity,
//       totalPrice: orderDB.totalPrice - productAmount * productQuantity,
//     });

//     order.totalItems -= productQuantity;
//     order.totalPrice -= productAmount * productQuantity;

//     res.send(order);
//   } catch (ex) {
//     next(ex);
//   }
// });
