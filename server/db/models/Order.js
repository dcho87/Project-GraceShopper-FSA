const Sequelize = require('sequelize')
const db = require('../db')

const { UUID, UUIDV4, INTEGER, BOOLEAN } = Sequelize;
const id = {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  };
const Order = db.define('order', {
    id,
    purchase: {
        type: BOOLEAN,
        defaultValue: false
    },
    totalProducts: {
        type: INTEGER,
        defaultValue: 0
    },
    totalPrice: {
        type: INTEGER,
        defaultValue: 0
    }
})

module.exports = Order