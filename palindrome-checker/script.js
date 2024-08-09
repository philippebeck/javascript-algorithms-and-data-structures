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

  const VALUE   = textElt.value.trim();
  textElt.value = "";

  if (!VALUE) {
    alert('Please input a value');
    return;
  }

  const LOWER_CASE_VALUE = VALUE.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
  const REVERSED_VALUE   = [...LOWER_CASE_VALUE].reverse().join('');

  const IS_PALINDROME = LOWER_CASE_VALUE === REVERSED_VALUE;
  const RESULT        = IS_PALINDROME ? 'is a palindrome' : 'is not a palindrome';

  resultElt.textContent = `${VALUE} ${RESULT}`;
};

// ********** MAIN **********

formElt.addEventListener('submit', checkPalindrome);
