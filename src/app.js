import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  // secret: getPriveteKey(config.secretFile) || 'xxxx-xxxx-xxxx-xxxx',
  secret: 'xxxxx-xxxxx-xxxxx',
  saveUninitialized: true,
  resave: true,
}));

app.use(routes);

export default app;
