"use strict";

const { default: axios } = require("axios");
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


  await Promise.all(
    users.map(async (user) => {
      await user.addOrder(await Order.create());
    })
  );

  const products = await Promise.all([
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
  const testOrders = [
    {
      purchased: true,
      totalItems: 2,
      totalPrice: 450,
    },
    {
      purchased: true,
      totalItems: 2,
      totalPrice: 450,
    },
    {
      purchased: true,
      totalItems: 1,
      totalPrice: 199,
    },
    {
      purchased: true,
      totalItems: 4,
      totalPrice: 1000,
    },
    {
      purchased: true,
      totalItems: 5,
      totalPrice: 600,
    },
  ];

  const products = await Promise.all([
    data.azuki.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Azuki",
        URL: "Azuki",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.RTFKTCLONEXTM.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Clone X",
        URL: "Clone_X",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.tastyBones.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Tasty Bones XYZ",
        URL: "Tasty_Bones",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.metascapes.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "The Metascapes",
        URL: "The_Metascapes",
        price: product.price,
      })
    ),
    data.cryptoPunks.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "Crypto Punks",
        URL: "Crypto_Punks",
        price: product.price,
      })
    ),
    data.grumpets.map((product) =>
      Product.create({
        name: product.name,
        description: null,
        imageURL: product.image_url,
        category: "Grumpets",
        URL: "Grumpets",
        price: product.price,
        inventory: product.inventory,
      })
    ),
    data.littleLemonFriends.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "Little Lemon Friends",
        URL: "Little_Lemon_Friends",
        price: product.price,
      })
    ),

    data.theLadies.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "The Ladies",
        URL: "The_Ladies",
        price: product.price,
        inventory: product.inventory,
      })
    ),
  ]);

  await Promise.all(
    users.map(async (user) => {
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
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
