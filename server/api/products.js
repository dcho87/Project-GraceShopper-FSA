const router = require("express").Router();
const { Product } = require("../db/models");

//route to all products
router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

//route search by ID
router.get(":/id", async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

//TO DO
//route to add a new product
router.post("/", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});

//TO DO
//route to update a product
router.put(":/id", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});

//route to remove product
router.delete(":/id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});