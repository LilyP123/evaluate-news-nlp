const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('dist'));
app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:8081'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

app.post('/proxy/analyze', (req, res) => {
  const { text } = req.body;
  axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${encodeURIComponent(process.env.API_KEY)}&lang=en&txt=${encodeURIComponent(text)}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.use('/proxy', createProxyMiddleware({
  target: 'https://api.meaningcloud.com/sentiment-2.1',
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});