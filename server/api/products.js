const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//route to All Products
router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

//route Search by ID
router.get(":/id", async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

//route to ADD a Product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
      description: req.body.description,
      category: req.body.category,
    };
    res.send(await Product.create(newProduct));
  } catch (ex) {
    next(ex);
  }
});

//route to UPDATE a Product
router.put(":/id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

//route to REMOVE a Product
router.delete(":/id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
