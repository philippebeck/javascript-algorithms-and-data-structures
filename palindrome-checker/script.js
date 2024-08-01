'use strict';

// ********** CONSTANTS **********

const formElt   = document.querySelector('form');
const textElt   = document.querySelector('#text-input');
const buttonElt = document.querySelector('#check-btn');
const resultElt = document.querySelector('#result');

// ********** FUNCTION **********

/**
 * Checks if a given value is a palindrome
 *
 * @param {Event} e - The event object from the form submission
 */
const checkPalindrome = (e) => {
  e.preventDefault();
  const value = textElt.value;

  if (value === '') {
    alert('Please input a value');
    return;
  }

  const lowerCaseValue = value.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
  const reversedValue  = [...lowerCaseValue].reverse().join('');

  const isPalindrome = lowerCaseValue === reversedValue;
  const result       = isPalindrome ? 'is a palindrome' : 'is not a palindrome';

  resultElt.textContent = `${value} ${result}`;
};

/**
 * Initializes event listeners for form submission & button click events
 */
const run = () => {
  formElt.addEventListener('submit', checkPalindrome);
  buttonElt.addEventListener('click', checkPalindrome);
}

// ********** MAIN **********

run();
