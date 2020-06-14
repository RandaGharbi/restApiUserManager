import initDataBase from './database/initDatabase';
import app from './app';
import config from './config';


initDataBase().then(() => {
  app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });
}).catch((err) => console.error(err));
