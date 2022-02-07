const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pictureURL: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://wallup.net/wp-content/uploads/2018/09/25/619118-blue_eyes-green_hair-elven-pointed_ears-video_games-Hearthstone-Warcraft-digital_art-artwork-Tyrande_Whisperwind-Moon-World_of_Warcraft-Blizzard_Entertainment-748x439.jpg',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: true
  },
  description: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

})

module.exports = Product
