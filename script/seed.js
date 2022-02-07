'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}


const products = await Promise.all([
Product.create({
  name: 1101, 
  description: 'A beautiful seascape',
  imageURL : 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  categoryId: Landscape, 
  price: 50
}),

 Product.create({
  name: 1102, 
  description: 'A spanning desert',
  imageURL : 'https://media.istockphoto.com/photos/sand-dunes-in-the-sahara-desert-morocco-picture-id983422208?k=20&m=983422208&s=612x612&w=0&h=gjtn_hlkqzKfGQJQg62QTUbpFlQ0O5E5LnxQ5arh4ao=',
  categoryId: Landscape, 
  price: 50
}),

 Product.create({
  name: 1103, 
  description: 'A stunning mountain',
  imageURL : 'https://media.istockphoto.com/videos/the-perfect-mountain-aerial-shot-video-id181013019?s=640x640',
  categoryId: Landscape, 
  price: 50
}),

 Product.create({
  name: 1104, 
  description: 'A captivating forest',
  imageURL : 'https://www.treehugger.com/thmb/QolJfOYFmxwIH6Sxv5SBqY8Kq-M=/1885x1414/smart/filters:no_upscale()/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg',
  categoryId: Landscape, 
  price: 50
}),

 Product.create({
  name: 1105, 
  description: 'A grandious city',
  imageURL : 'https://static01.nyt.com/images/2021/04/09/realestate/09SUBURBTOCITY-slide-ROM2/09SUBURBTOCITY-slide-ROM2-mobileMasterAt3x.jpg',
  categoryId: Landscape, 
  price: 50
}),


//doodle
Product.create({
  name: 1201, 
  description: 'Squiggle 2',
  imageURL : 'https://lh3.googleusercontent.com/36pq45ZwWmyX1haBqD29ysVcw8F9Cmx1ZgAFC6ptJfnDAJneA9Vqk6pRSScZDU0c8Hh1MPF6uvEcNEI-cT_DEbyWNBGhvinwA5DE=w1400-k',
  categoryId: Doodle, 
  price: 70
}),

 Product.create({
  name: 1202, 
  description: 'Squiggle 4',
  imageURL : 'https://lh3.googleusercontent.com/_gy7-sZJ5u5H0dBkANZTtGaBtbBgU_Ui424RHvx9k1AhffIajWs-ttf7Dn4sUcW2fdmhEN0Hcjn6KamobkrAs5hVtBMf29xzNSSDOw=w1400-k',
  categoryId: Doodle, 
  price: 70
}),

 Product.create({
  name: 1203, 
  description: 'Squiggle 6',
  imageURL : 'https://lh3.googleusercontent.com/V8vm4TZJuQDB-frpp2RROJJBcQg2A8KC-nTf7ZMM04RDlhlCPDDs0cR0gtyWV2llJ0yR9L9W6zD0Ra7jnepWExECoNs5ZIfL7bfsAA=w1400-k',
  categoryId: Doodle, 
  price: 70
}),

Product.create({
  name: 1204, 
  description: 'Rainbow',
  imageURL : 'https://static.nftgo.io/asset/metadata/c9fba9f0b9225caa73710b35b8ad0eb8.png',
  categoryId: Doodle, 
  price: 70
}),

 Product.create({
  name: 1205, 
  description: 'Squiggle 3',
  imageURL : 'https://external-preview.redd.it/cZn2m1ikRJMIvOWLjl6p-hT6vmOMEjVIc-uPUQxgO2A.jpg?auto=webp&s=0821e1f4ae5004e14320138c67d50306f7c5d961',
  categoryId: Doodle, 
  price: 70
}),

//cars

Product.create({
  name: 1301, 
  description: 'Electric',
  imageURL : 'https://oceanatlanticrentals.com/wp-content/uploads/2016-Club-Car-Precedent-4-Seater-Macon-GA-1295_2.aiimg-w700ar1cr0.jpg',
  categoryId: Car, 
  price: 100
}),

Product.create({
  name: 1302, 
  description: 'SUV',
  imageURL : 'https://di-uploads-pod4.dealerinspire.com/sunrisechevyredesign/uploads/2019/02/tahoe-exterior.jpg',
  categoryId: Car, 
  price: 100
}),

Product.create({
  name: 1303, 
  description: 'Tank',
  imageURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Challenger2-Bergen-Hohne-Training-Area-2.jpg/600px-Challenger2-Bergen-Hohne-Training-Area-2.jpg',
  categoryId: Car, 
  price: 100
}),

 Product.create({
  name: 1304, 
  description: 'Sports Car',
  imageURL : 'https://www.denverpost.com/wp-content/uploads/2021/07/7.14D-Lucid-scaled-1.jpg?w=1020',
  categoryId: Car, 
  price: 100
}),

Product.create({
  name: 1305, 
  description: 'Convertible',
  imageURL : 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/mercedes-amg-c63-cabriolet.jpg?itok=mY23jB1D',
  categoryId: Car, 
  price: 100
}),


// kangaroo
Product.create({
  name: 1401, 
  description: 'Sleepy',
  imageURL : 'https://i.pinimg.com/474x/81/ab/90/81ab90af8c33e17078eae6b13a7cada1--kangaroo-jack-sleeping-animals.jpg',
  categoryId: Kangaroo, 
  price: 150
}),

 Product.create({
  name: 1402, 
  description: 'Seductive',
  imageURL : 'https://i.pinimg.com/originals/93/57/52/935752e7d704377fadbdfa35b8e3e15c.jpg',
  categoryId: Kangaroo, 
  price: 150
}),

 Product.create({
  name: 1403, 
  description: 'Funny Face',
  imageURL : 'https://www.askideas.com/media/40/Funny-Kangaroo-Showing-Tomgue-Face-Picture.jpg',
  categoryId: Kangaroo, 
  price: 150
}),

Product.create({
  name: 1404, 
  description: 'Snapchat lense',
  imageURL : 'https://lensesforsnap.com/wp-content/uploads/2021/02/funny-kangaroo-2.png',
  categoryId: Kangaroo, 
  price: 150
}),

Product.create({
  name: 1405, 
  description: 'Buff',
  imageURL : 'https://i.redd.it/fgb64gg7w0271.jpg',
  categoryId: Kangaroo, 
  price: 150
}),

Product.create({
  name: 1501, 
  description: 'smile',
  imageURL : 'http://www.clipartbest.com/cliparts/dT8/oEk/dT8oEkXKc.jpg',
  categoryId: Person, 
  price: 200
}),

Product.create({
  name: 1502, 
  description: 'point',
  imageURL : 'http://www.freepngclipart.com/download/stick_figure/20206-girl-stick-figure-images-hd-photo.jpeg',
  categoryId: Person, 
  price: 200
}),

Product.create({
  name: 1503, 
  description: 'shrug',
  imageURL : 'https://clipartix.com/wp-content/uploads/2016/05/Girl-clipart-stick-figure-free-clipart-images.jpeg',
  categoryId: Person, 
  price: 200
}),

Product.create({
  name: 1504, 
  description: 'girl',
  imageURL : 'https://clipartix.com/wp-content/uploads/2016/05/Stick-figures-on-clip-art-sticks-and-vector-graphics.jpg',
  categoryId: Person, 
  price: 200
}),

Product.create({
  name: 1505, 
  description: 'wave',
  imageURL : 'https://i.dlpng.com/static/png/6700536_preview.png',
  categoryId: Person, 
  price: 200
})
])


console.log(`seeded ${products.length} products successfully`)


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
