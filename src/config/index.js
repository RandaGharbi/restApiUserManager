import getEnv from '../utils/getEnv';

const env = getEnv('NODE_ENV') || 'development';

const config = {
  env,
  name: getEnv('APP_NAME') || 'user-manager',
  host: getEnv('APP_HOST') || '0.0.0.0',
  port: Number(getEnv('APP_PORT')) || 5000,
  secretFile: getEnv('APP_SECRET_FILE') || 'secret.json',
  dataBaseName: getEnv('APP_DATABASE_NAME') || 'user-manager',
  dataBaseHost: getEnv('APP_DATABASE_HOST') || 'localhost',
  dataBasePort: getEnv('APP_DATABASE_PORT') || 5432,
  dataBaseUserName: getEnv('APP_DATABASE_USERNAME') || 'root',
  dataBasePassword: getEnv('APP_DATABASE_PASSWORD') || 'root',
  maxPoolSize: Number(getEnv('APP_SQL_MAX_POOL_SIZE')) || 5,
};

export default config;
