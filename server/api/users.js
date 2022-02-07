const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get(':/id', async(req, res, next) => {
  try{
    res.send(await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','email','firstName','lastName']
    }))
  }
  catch(ex){
    next(ex)
  }
})


//route to get cart for user
router.get('/carts/:id', async(req, res, next) => {
  try{

  }
  catch(ex){
    next(ex)
  }
})

//route to update cart for user
router.put('/carts/:id', async(req, res, next) => {
  try{

  }
  catch(ex){
    next(ex)
  }
})

/*
  No POST, DELETE
*/