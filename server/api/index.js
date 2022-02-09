const router = require("express").Router();
module.exports = router;

<<<<<<< HEAD
router.use("/users", require("./users"));
router.use("/products", require("./products"));
=======
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
>>>>>>> de245dd7cf35b90377dac1861ab3a0f6f2698632

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
