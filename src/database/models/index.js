import recursiveReadSync from 'recursive-readdir-sync';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config';

const basename = path.basename(__filename);
const models = {};

const sequelize = new Sequelize({
  host: config.dataBaseHost,
  port: config.dataBasePort,
  database: config.dataBaseName,
  username: config.dataBaseUserName,
  password: config.dataBasePassword,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: config.maxPoolSize,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

recursiveReadSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-9) === '.table.js')
  .forEach(file => {
    const model = sequelize.import(file);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
