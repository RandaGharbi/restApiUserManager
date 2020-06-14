import models from './models';

const initDataBase = async () => {
  try {
    await models.sequelize.sync({
    });
    console.log('Initialisation of the tables default values done');
  } catch (err) {
    console.error(`Error init of database: ${JSON.stringify(err)}`);
    throw new Error(err.toString());
  }
};
export default initDataBase;
