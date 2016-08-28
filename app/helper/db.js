const Sequelize = require('sequelize')

let sequelize = new Sequelize('bible', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: () => {/* Do nothing now*/}
})

let BibleModel = sequelize.define('bibletext', {
  Verse: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  Scripture: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = {
  BibleModel
}
