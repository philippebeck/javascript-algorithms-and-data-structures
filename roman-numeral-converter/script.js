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
 * Displays the result of a Roman numeral conversion based on the input value & number.
 *
 * @param {string} value - The input value to be validated.
 * @param {number} number - The number to be converted to a Roman numeral.
 */
const displayResult = (value, number) => {
  const INVALID_NUM = 'Please enter a valid number';
  const NEGATIV_NUM = 'Please enter a number greater than or equal to 1';
  const MAX_NUM     = 'Please enter a number less than or equal to 3999';

  !value || value.match(/[e.]/g) ? outputElt.textContent = INVALID_NUM
    : (number < 1) ? outputElt.textContent = NEGATIV_NUM
    : (number > 3999) ? outputElt.textContent = MAX_NUM
    : (outputElt.textContent = getRomanNumber(number)) && outputElt.classList.remove('alert');
};

/**
 * Handles the form submission event to convert a number to a Roman numeral.
 *
 * @param {Event} e - The event object from the form submission
 */
const convertToRoman = (e) => {
  e.preventDefault();

  const VALUE  = numberElt.value;
  const NUMBER = parseInt(VALUE, 10);

  outputElt.textContent = '';
  outputElt.classList.add('alert');

  displayResult(VALUE, NUMBER);
};

// ********** MAIN **********

formElt.addEventListener('submit', convertToRoman);
