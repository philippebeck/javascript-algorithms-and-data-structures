'use strict';

// ********** CONSTANTS **********

const COUNTRY = '^(1\\s?)?';
const AREA    = '(\\([0-9]{3}\\)|[0-9]{3})';
const SPECIAL = '[\\s\\-]?';
const NUMBER  = '[0-9]{3}[\\s\\-]?[0-9]{4}$';

const formElt    = document.querySelector('form');
const textElt    = document.querySelector('#user-input');
const checkElt   = document.querySelector('#check-btn');
const clearElt   = document.querySelector('#clear-btn');
const resultsElt = document.querySelector('#results-div');

// ********** FUNCTIONS **********

/**
 * Checks if the provided phone number is a valid US number & displays the result
 *
 * @param {Event} e - The event object from the form submission
 */
const checkNumber = (e) => {
  e.preventDefault();
  const value = textElt.value;

  if (value === '') {
    alert('Please provide a phone number');
    return;
  }

  const resultElt = document.createElement('p');
  const regex     = new RegExp(`${COUNTRY}${AREA}${SPECIAL}${NUMBER}`);

  if (regex.test(value)) {
    resultElt.style.color = 'var(--success)';
  } else {
    resultElt.style.color = 'var(--danger)';
  }

  resultElt.className   = 'resultElt';
  resultElt.textContent = `${regex.test(value) ? 'Valid' : 'Invalid'} US number: ${value}`;

  resultsElt.appendChild(resultElt);
  textElt.value = '';
};

/**
 * Clears the text content of the result element
 *
 * @param {Event} e - The event object from the form submission
 */
const clearNumber = (e) => {
  e.preventDefault();
  resultsElt.textContent = '';
};

/**
 * Initializes event listeners for the form, check button & clear button
 */
const run = () => {
  formElt.addEventListener('submit', checkNumber);
  checkElt.addEventListener('click', checkNumber);
  clearElt.addEventListener('click', clearNumber);
}

// ********** MAIN **********

run();
