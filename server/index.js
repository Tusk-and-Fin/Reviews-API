require('dotenv').config();
const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());
app.use('/', router);
app.get('/home', function (req, res) {
  res.sendStatus(200)
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
