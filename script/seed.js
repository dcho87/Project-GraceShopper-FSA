"use strict";

const {
  db,
  models: { User, Product, Order, OrderProduct },
} = require("../server/db");

const data = require("./data");

Order.belongsTo(User);
User.hasMany(Order);
OrderProduct.belongsTo(Product);
OrderProduct.belongsTo(Order);
Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      first_name: "Daniel",
      last_name: "Cho",
      email: "daniel@gmail.com",
      password: "daniel_pw",
      isAdmin: true,
    }),
    User.create({
      first_name: "Ben",
      last_name: "Greenspan",
      email: "ben@gmail.com",
      password: "ben_pw",
      address: "1600 Pennsylvania Avenue",
      isAdmin: false,
    }),
    User.create({
      first_name: "Joe",
      last_name: "Collins",
      email: "joe@gmail.com",
      password: "joe_pw",
      address: "1060 W Addison St",
      isAdmin: false,
    }),
    User.create({
      first_name: "Saad",
      last_name: "Razzak",
      email: "saad@gmail.com",
      password: "saad_pw",
      isAdmin: true,
    }),
  ]);

  const products = await Promise.all([
    // data.cloneX.map((product) =>
    //   Product.create({
    //     name: product.name,
    //     description: product.description,
    //     imageURL: product.file_url,
    //     category: "Clone X",
    //     price: Math.floor(Math.random() * (10000 - 500) + 500),
    //     inventory: Math.floor(Math.random() * (100 - 20) + 20),
    //   })
    // ),
    // data.TheStrawHatBackpacker.map((product) =>
    //   Product.create({
    //     name: product.name,
    //     description: product.description,
    //     imageURL: product.file_url,
    //     category: "Clone X",
    //     price: Math.floor(Math.random() * (10000 - 500) + 500),
    //     inventory: Math.floor(Math.random() * (100 - 20) + 20),
    //   })
    // ),
  ]);
  Product.create({
    name: "Seascape",
    description: "A beautiful seascape",
    imageURL:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Landscapes",
    price: 39,
    inventory: 12,
  }),
    Product.create({
      name: "Desert",
      description: "A spanning desert",
      imageURL:
        "https://media.istockphoto.com/photos/sand-dunes-in-the-sahara-desert-morocco-picture-id983422208?k=20&m=983422208&s=612x612&w=0&h=gjtn_hlkqzKfGQJQg62QTUbpFlQ0O5E5LnxQ5arh4ao=",
      category: "Landscapes",
      price: 22,
      inventory: 18,
    }),
    Product.create({
      name: "Mountain",
      description: "A stunning snowy mountain",
      imageURL:
        "https://media.istockphoto.com/videos/the-perfect-mountain-aerial-shot-video-id181013019?s=640x640",
      category: "Landscapes",
      price: 25,
      inventory: 19,
    }),
    Product.create({
      name: "Forest",
      description: "A captivating silent forest",
      imageURL:
        "https://www.treehugger.com/thmb/QolJfOYFmxwIH6Sxv5SBqY8Kq-M=/1885x1414/smart/filters:no_upscale()/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg",
      category: "Landscapes",
      price: 39,
      inventory: 15,
    }),
    Product.create({
      name: "City",
      description: "A grandious city",
      imageURL:
        "https://static01.nyt.com/images/2021/04/09/realestate/09SUBURBTOCITY-slide-ROM2/09SUBURBTOCITY-slide-ROM2-mobileMasterAt3x.jpg",
      category: "Landscapes",
      price: 50,
      inventory: 9,
    }),
    //doodle
    Product.create({
      name: "Squiggly",
      description: "Unique Squiggle with two peaks",
      imageURL:
        "https://lh3.googleusercontent.com/36pq45ZwWmyX1haBqD29ysVcw8F9Cmx1ZgAFC6ptJfnDAJneA9Vqk6pRSScZDU0c8Hh1MPF6uvEcNEI-cT_DEbyWNBGhvinwA5DE=w1400-k",
      category: "Doodles",
      price: 170,
      inventory: 7,
    }),
    Product.create({
      name: "Big Squiggle",
      description: "Chromatic and intense action",
      imageURL:
        "https://lh3.googleusercontent.com/_gy7-sZJ5u5H0dBkANZTtGaBtbBgU_Ui424RHvx9k1AhffIajWs-ttf7Dn4sUcW2fdmhEN0Hcjn6KamobkrAs5hVtBMf29xzNSSDOw=w1400-k",
      category: "Doodles",
      price: 120,
      inventory: 5,
    }),
    Product.create({
      name: "Blue Squiggle",
      description: "Scintillating vertical lines",
      imageURL:
        "https://lh3.googleusercontent.com/V8vm4TZJuQDB-frpp2RROJJBcQg2A8KC-nTf7ZMM04RDlhlCPDDs0cR0gtyWV2llJ0yR9L9W6zD0Ra7jnepWExECoNs5ZIfL7bfsAA=w1400-k",
      category: "Doodles",
      price: 290,
      inventory: 8,
    }),
    Product.create({
      name: "Squiggle Rainbow",
      description: "Vibrate experience",
      imageURL:
        "https://static.nftgo.io/asset/metadata/c9fba9f0b9225caa73710b35b8ad0eb8.png",
      category: "Doodles",
      price: 350,
      inventory: 123,
    }),
    Product.create({
      name: "Light Squiggle",
      description: "Lighter hue for a more mellow affair",
      imageURL:
        "https://external-preview.redd.it/cZn2m1ikRJMIvOWLjl6p-hT6vmOMEjVIc-uPUQxgO2A.jpg?auto=webp&s=0821e1f4ae5004e14320138c67d50306f7c5d961",
      category: "Doodles",
      price: 99,
      inventory: 4,
    }),
    //cars

    Product.create({
      name: "Golf",
      description: "It goes fast enough",
      imageURL:
        "https://oceanatlanticrentals.com/wp-content/uploads/2016-Club-Car-Precedent-4-Seater-Macon-GA-1295_2.aiimg-w700ar1cr0.jpg",
      category: "Cars",
      price: 100,
      inventory: 21,
    }),
    Product.create({
      name: "SUV",
      description: "Luxury and Utility",
      imageURL:
        "https://di-uploads-pod4.dealerinspire.com/sunrisechevyredesign/uploads/2019/02/tahoe-exterior.jpg",
      category: "Cars",
      price: 120,
      inventory: 12,
    }),
    Product.create({
      name: "Tank",
      description: "Truck will fit your golf clubs",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Challenger2-Bergen-Hohne-Training-Area-2.jpg/600px-Challenger2-Bergen-Hohne-Training-Area-2.jpg",
      category: "Cars",
      price: 450,
      inventory: 9,
    }),
    Product.create({
      name: "Sport",
      description: "Suitable for a Bond villan",
      imageURL:
        "https://www.denverpost.com/wp-content/uploads/2021/07/7.14D-Lucid-scaled-1.jpg?w=1020",
      category: "Cars",
      price: 720,
      inventory: 5,
    }),
    Product.create({
      name: "Convertible",
      description:
        "Holding this token gives you fractional ownership of the product",
      imageURL:
        "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/mercedes-amg-c63-cabriolet.jpg?itok=mY23jB1D",
      category: "Cars",
      price: 399,
      inventory: 3,
    }),
    // kangaroo
    Product.create({
      name: "Sleepy",
      description: "Narcoleptic in nature",
      imageURL:
        "https://i.pinimg.com/474x/81/ab/90/81ab90af8c33e17078eae6b13a7cada1--kangaroo-jack-sleeping-animals.jpg",
      category: "Kangaroos",
      price: 150,
      inventory: 9,
    }),
    Product.create({
      name: "Hello",
      description: "Seductive",
      imageURL:
        "https://i.pinimg.com/originals/93/57/52/935752e7d704377fadbdfa35b8e3e15c.jpg",
      category: "Kangaroos",
      price: 150,
      inventory: 7,
    }),
    Product.create({
      name: "Goofy",
      description: "Ready to hop around",
      imageURL:
        "https://www.askideas.com/media/40/Funny-Kangaroo-Showing-Tomgue-Face-Picture.jpg",
      category: "Kangaroos",
      price: 150,
      inventory: 8,
    }),
    Product.create({
      name: "Goofier",
      description:
        "Historians believe this work was augmented by a Snapchat lens ",
      imageURL:
        "https://lensesforsnap.com/wp-content/uploads/2021/02/funny-kangaroo-2.png",
      category: "Kangaroos",
      price: 150,
      inventory: 14,
    }),
    Product.create({
      name: "Buff",
      description: "How tough are you?",
      imageURL: "https://i.redd.it/fgb64gg7w0271.jpg",
      category: "Kangaroos",
      price: 150,
      inventory: 6,
    }),
    Product.create({
      name: "Smile",
      description: "Reminiscent of the halcyon days",
      imageURL: "http://www.clipartbest.com/cliparts/dT8/oEk/dT8oEkXKc.jpg",
      category: "People",
      price: 200,
      inventory: 19,
    }),
    Product.create({
      name: "Point",
      description:
        "When you point one finger, there are three fingers pointing back at your... maybe",
      imageURL:
        "http://www.freepngclipart.com/download/stick_figure/20206-girl-stick-figure-images-hd-photo.jpeg",
      category: "People",
      price: 200,
      inventory: 3,
    }),
    Product.create({
      name: "Shrug",
      description: "An apocryphal demeanor",
      imageURL:
        "https://clipartix.com/wp-content/uploads/2016/05/Girl-clipart-stick-figure-free-clipart-images.jpeg",
      category: "People",
      price: 200,
      inventory: 17,
    }),
    Product.create({
      name: "Girl",
      description: "Youthful and Convival",
      imageURL:
        "https://clipartix.com/wp-content/uploads/2016/05/Stick-figures-on-clip-art-sticks-and-vector-graphics.jpg",
      category: "People",
      price: 200,
      inventory: 9,
    }),
    Product.create({
      name: "Wave",
      description: "His best statue of liberty impression",
      imageURL:
        "https://i0.wp.com/clipartworks.com/wp-content/uploads/2021/06/Stick-Man-Wave.jpg?resize=300%2C300&ssl=1",
      category: "People",
      price: 200,
      inventory: 8,
    }),
    /// Apes
    Product.create({
      name: "Pizza",
      description: "I am not sure he is going to share",
      imageURL:
        "https://lh3.googleusercontent.com/I1-Fa_i7gG3cJ-kiwEHki-5P5RE47lyeY31qKsX04z3X56jzA4sE5VIDYoAVCgOmssS39tfQDEkGeiOv_Chj1RXOOUdc3Lfb__AA3Q=w600",
      category: "Apes",
      price: 500,
      inventory: 3,
    }),
    Product.create({
      name: "Colorful",
      description: "Radical in nature",
      imageURL:
        "https://lh3.googleusercontent.com/oZ4wtxWRkKuDTlOnZV25ZSehUnmLgh8wF5SA_vaudILPQ23fY2SA8kEVoG3-JfTsMAY9sdycqWDvF24tFcwzTuqptILDGb9_nQLpuJ4",
      category: "Apes",
      price: 500,
      inventory: 2,
    }),
    Product.create({
      name: "Cowboy",
      description: "All Hat, No Cattle",
      imageURL:
        "https://lh3.googleusercontent.com/natQzxcx7wCSsfYL5VgwFx1occeJOQdGm4hQGwWOoIh5vP0YaxcptD5dVZBOB1UmMr0CBAgkapdWNznwmwpO4O1KwL6EjLcTqo7_=w600",
      category: "Apes",
      price: 500,
      inventory: 4,
    }),
    ///Punks
    Product.create({
      name: "Cigarette",
      description: "Someone introduce this man to a Juul",
      imageURL: "https://www.larvalabs.com/cryptopunks/cryptopunk8348.png",
      category: "Punks",
      price: 700,
      inventory: 2,
    }),
    Product.create({
      name: "Headband",
      description: "Ready to help Michael and Buggs defeat the Monstars",
      imageURL:
        "https://lh3.googleusercontent.com/PWDq8erM2dMscd99OntjFRJFfvtvki7uxeYiBUT8e59Kdbn8s34dM59kCkVZ66b687B6i8KXMDspRfnU-JbLcB9Kc23EoSydJNkmgA=w600",
      category: "Punks",
      price: 700,
      inventory: 1,
    }),
    Product.create({
      name: "Bandit",
      description: "Display your rebellious and slightly unshaven nature",
      imageURL:
        "https://lh3.googleusercontent.com/VZgeKWUmrLjkbbCfjMn3ytDvOK3nLJjImk1-CW0jxIwE1XYIDnUDbcwbEOkrLXaS9aLhQJLQNCsSVuMwSg3RGtB1eIqPDQ2FU4OF=s0",
      category: "Punks",
      price: 700,
      inventory: 3,
    }),
    await Promise.all(
      users.map(async (user) => {
        await user.addOrder(await Order.create());
      })
    );

  console.log(`seeded ${users.length} users`);

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}
// console.log(`seeded ${products.length} products successfully`)

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
