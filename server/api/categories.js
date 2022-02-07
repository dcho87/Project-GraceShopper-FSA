const router = require("express").Router();
const { Category } = require("../db/models");

//route to all category
router.get("/", async (req, res, next) => {
  try {
    res.send(await Category.findAll());
  } catch (ex) {
    next(ex);
  }
});

//route search by ID
router.get(":/id", async (req, res, next) => {
  try {
    res.send(await Category.findByPk(req.params.id, {include: Product}));
  } catch (ex) {
    next(ex);
  }
});

/*
    No POST, PUT, DELETE
*/