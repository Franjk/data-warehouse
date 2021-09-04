require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sync = require('./db/sync');
const apiRouter = require('./routes/router');

const { SYNC_DB, NODE_ENV, PORT } = process.env;

if (SYNC_DB == 'true') {
  if (NODE_ENV === 'development') {
    sync({ force: true });
  } else if (NODE_ENV === 'production') {
    sync({ alter: true });
  }
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/api', apiRouter);

app.listen(PORT || 4000, () => {
  console.log(`App listening on port ${PORT || 4000}`);
});
