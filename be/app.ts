//src/index.ts
import express from 'express';
import logger from 'morgan';

const app = express();

require('dotenv').config();
app.use(logger('dev'));


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});