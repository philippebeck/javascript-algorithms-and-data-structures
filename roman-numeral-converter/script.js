'use strict';

// ********** CONSTANTS **********

const formElt   = document.querySelector('form');
const numberElt = document.querySelector('#number');
const buttonElt = document.querySelector('#convert-btn');
const outputElt = document.querySelector('#output');

const data = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

// ********** FUNCTIONS **********

/**
 * Returns a given number to its Roman numeral representation
 *
 * @param {number} number - The number to be converted
 * @return {string} The Roman numeral representation of the number
 */
const getRomanNumber = (number) => {
  let result = '';

  for (const key in data) {
    while (number >= data[key]) {
      result += key;
      number -= data[key];
    }
  }

  return result;
};


/**
 * Validates the input value & number.
 *
 * @param {string} value - The input value to be validated
 * @param {number} number - The number to be validated
 * @return {boolean} Returns true if the input value is valid, false otherwise
 */
const isValid = (value, number) => {
  if (!value || value.match(/[e.]/g)) {
    outputElt.textContent = 'Please enter a valid number';

  } else if (number < 1) {
    outputElt.textContent = 'Please enter a number greater than or equal to 1';

  } else if (number > 3999) {
    outputElt.textContent = 'Please enter a number less than or equal to 3999';

  } else {
    return true;
  }

  outputElt.classList.add('alert');

  return false;
};

/**
 * Runs the conversion process based on
 * the input value from the 'number' element
 * 
 * @param {Event} e - The event object from the form submission
 */
const convertToRoman = (e) => {
  e.preventDefault();

  const value  = numberElt.value;
  const number = parseInt(value, 10);

  outputElt.textContent = '';
  outputElt.classList.toggle('alert', false);

  if (isValid(value, number)) outputElt.textContent = getRomanNumber(number);
};

/**
 * Initializes event listeners for form submission & button click events
 */
const run = () => {
  formElt.addEventListener('submit', convertToRoman);
  buttonElt.addEventListener('click', convertToRoman);
}

// ********** MAIN **********

run();
