const {
  BIBLE_API_ENV_PATH
} = process.env

let defaultEnv = {
  MYSQL_DATABASE: 'bible',
  MYSQL_ROOT_PASSWORD: '733da9b63',
  DB_IMAGE_NAME: 'bible-api-db',
  DB_CONTAINER_NAME: 'bible-api-db',
  DB_PORT: 3306,
  APP_PORT: 3000,
  URL_PREFIX: '' // for example '/api'
}

module.exports = BIBLE_API_ENV_PATH ? require(BIBLE_API_ENV_PATH) : defaultEnv
