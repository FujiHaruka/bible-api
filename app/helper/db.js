const Sequelize = require('sequelize')
const {
  DB_PORT,
  MYSQL_DATABASE,
  MYSQL_ROOT_PASSWORD
} = require('../../env')
const debug = require('debug')('bible-api:db')

let sequelize = new Sequelize(MYSQL_DATABASE, 'root', MYSQL_ROOT_PASSWORD, {
  host: 'localhost',
  port: DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: (log) => { debug(log) }
})

let BibleModel = sequelize.define('collo_bible', {
  key: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = {
  BibleModel
}
