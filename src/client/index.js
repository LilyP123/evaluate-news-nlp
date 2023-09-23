const { checkForName } = require('./js/nameChecker.js');
const { handleSubmit } = require('./js/formHandler.js');

require('./styles/resets.scss');
require('./styles/base.scss');
require('./styles/footer.scss');
require('./styles/form.scss');
require('./styles/header.scss');

console.log(checkForName);
console.log(handleSubmit);

alert("I EXIST");
console.log("CHANGE!!");

module.exports = {
  checkForName,
  handleSubmit,
  onBlur
};

// Call the checkForName function
const inputValue = document.getElementById('name')?.value;
if (inputValue) {
  checkForName(inputValue);
}

// Call the handleSubmit function
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(event);
  });
}

// Call the onBlur function
const input = document.getElementById('name');
if (input) {
  input.addEventListener('blur', onBlur);
}

function onBlur() {
  const inputValue = document.getElementById('name')?.value;
  if (inputValue) {
    checkForName(inputValue);
    console.log('Input value:', inputValue);
  }
}