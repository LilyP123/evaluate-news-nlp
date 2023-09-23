const axios = require('axios');
const cheerio = require('cheerio');
const baseUrl = 'http://localhost:8080'; // Replace with your actual base URL

function getAPIKey() {
  return axios.get(`${baseUrl}/api-key`)
    .then(response => {
      console.log('API key retrieved:', response.data.apiKey);
      return response.data.apiKey;
    })
    .catch(error => {
      console.log('Error:', error);
      return null;
    });
}

function analyzeURLContent(formText, apiKey) {
  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('url', formText);
  params.append('lang', 'en'); // Replace with the appropriate language code if needed

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/proxy/analyze`, params.toString(), config)
      .then(response => {
        const jsonData = response.data;
        console.log('API Response:', jsonData);
        resolve(jsonData);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
}

function handleSubmit(event) {
  console.log('handleSubmit called');
  event.preventDefault();

  const formElement = document.getElementById('myForm');
  const formdata = new FormData(formElement);
  const formText = formdata.get('input');

  function updateUI(data) {
    const resultElement = document.getElementById('results');
    if (resultElement) {
      resultElement.innerHTML = `polarity: ${data.score_tag}<br>agreement: ${data.agreement}<br>confidence: ${data.confidence}<br>irony: ${data.irony}<br>subjectivity: ${data.subjectivity}`;
    } else {
      console.log('Error: result element not found');
    }

    console.log('Data:', data);
    console.log('Before getting element by ID');
    document.getElementById('polarity').textContent = data.score_tag;
    console.log('Before getting element by polarity');
    document.getElementById('agreement').textContent = data.agreement;
    console.log('Before getting element by agree');
    document.getElementById('subjectivity').textContent = data.subjectivity;
    console.log('Before getting element by subjectivity');
    document.getElementById('confidence').textContent = data.confidence;
    console.log('Before getting element by confidence');
    document.getElementById('irony').textContent = data.irony;
    console.log('Before getting element by irony');
    console.log('Response data:', data);
    document.getElementById('results').innerHTML = data.message;
  }

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  if (isValidURL(formText)) {
    console.log('Valid link');
    analyzeURLContent(formText)
      .then(data => {
        updateUI(data);
      })
      .catch(error => {
        console.log('Error in analyzeURLContent:', error);
      });
  } else {
    console.log('Invalid link');
  }
}
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('myForm').addEventListener('submit', handleSubmit);
});
module.exports = {
  getAPIKey,
  analyzeURLContent,
  handleSubmit,
};