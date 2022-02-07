const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
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
      attributes: ['id','first_name','last_name', 'email', 'password', 'isAdmin', 'isEngineer' ]
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