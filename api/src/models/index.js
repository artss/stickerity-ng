// import path from 'path';
// import Sequelize from 'sequelize';

// import configs from '../config/db.json';

const path = require('path');
const Sequelize = require('sequelize');
const configs = require('./config.js');

const env = process.env.NODE_ENV || 'development';

const config = configs[env];

const modelNames = [
  'users',
  'lists',
  'items',
];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = modelNames
  .map(file => sequelize.import(path.join(__dirname, `${file}.js`)))
  .reduce((models, model) => {
    if (model.associate) model.associate(models);
    return { ...models, [model.name]: model };
  }, {});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
