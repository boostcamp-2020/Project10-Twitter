import express from 'express';
import logger from 'morgan';
import indexRouter from './routes/index';
import dotenv from 'dotenv';

const app = express();

app.use(logger('dev'));

dotenv.config();

app.use('/', indexRouter);

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
