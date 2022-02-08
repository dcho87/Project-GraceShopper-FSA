const Sequelize = require('sequelize')
const db = require('../db')


const { STRING, UUID, UUIDV4, INTEGER, TEXT, BOOLEAN } = Sequelize;
const id = {
  type: UUID,
  defaultValue: UUIDV4,
  primaryKey: true,
};

const Product = db.define("product", {
  id,
  name: {
    type: STRING,
    allowNull: false
  },
  pictureURL: {
    type: TEXT,
    defaultValue:
      'https://wallup.net/wp-content/uploads/2018/09/25/619118-blue_eyes-green_hair-elven-pointed_ears-video_games-Hearthstone-Warcraft-digital_art-artwork-Tyrande_Whisperwind-Moon-World_of_Warcraft-Blizzard_Entertainment-748x439.jpg',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: INTEGER,
    allowNull: false
  },
  inventory: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: true
  },
  description: {
    type: STRING
  },
  category: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Product