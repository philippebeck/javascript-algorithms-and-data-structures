"use strict";

// ********** CONSTANTS **********

const formElt        = document.querySelector('form');
const cashElt        = document.querySelector('#cash');
const purchaseBtnElt = document.querySelector('#purchase-btn');
const totalElt       = document.querySelector('#total');
const changeElt      = document.querySelector('#change');
const changeDueElt   = document.querySelector('#change-due');

const currency = {
  PENNY: 'Pennies',
  NICKEL: 'Nickels',
  DIME: 'Dimes',
  QUARTER: 'Quarters',
  ONE: 'Ones',
  FIVE: 'Fives',
  TEN: 'Tens',
  TWENTY: 'Twenties',
  'ONE HUNDRED': 'Hundreds'
};

// ********** VARIABLES **********

let price = 1.87;

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// ********** FUNCTIONS **********

/**
 * Checks the cash value entered by the user & performs the necessary actions based on the value.
 *
 * @return {boolean|number} Returns false if the cash value is not provided, displays an alert message & clears the cash input field.
 * Returns false if the cash value is less than the price.
 * Displays the appropriate status message & clears the cash input field.
 * Returns false if the cash value is equal to the price.
 * Displays the appropriate status message & clears the cash input field.
 * Returns the cash value if it is greater than the price.
 */
const checkCash = () => {
  const cash    = Number(cashElt.value);
  cashElt.value = '';

  if (!cash) return false;

  if (cash < price) {
    changeDueElt.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    alert('Customer does not have enough money to purchase the item');

    return false;
  }

  if (cash === price) {
    changeDueElt.innerHTML = '<p>No change due - customer paid with exact cash</p>';

    return false;
  }

  return cash;
}

/**
 * Formats the results by setting the status & change in the changeDueElt element
 *
 * @param {string} status - The status of the transaction
 * @param {Array<Array<string, number>>} change - The change due in the transaction
 */
const displayResults = (status, change) => {
  changeDueElt.innerHTML = `<p>Status: ${status}</p>`;
  change.map(money => (changeDueElt.innerHTML += `<p>${money[0]}: $${money[1]}</p>`));

  return;
};

/**
 * Updates the UI with the given change
 *
 * @param {Array<Array<string|number>>} change - The change to be applied to the UI
 */
const updateCashRegister = (change) => {
  if (change) {
    for (const changeArr of change) {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1]    = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    }
  }

  totalElt.textContent = `Total: $${price}`;

  changeElt.innerHTML = `<p><b>Change in drawer:</b></p>
    ${cid.map(money => `<p>${currency[money[0]]}: $${money[1]}</p>`).join('')}`;
};

/**
 * Function to calculate the cash register for change due
 * Then update the UI accordingly
 */
const calculateCashRegister = (e) => {
  e.preventDefault();

  const cash = checkCash();

  if (!cash) return;

  let changeDue      = cash - price;
  let reversedCid    = cid.reverse();
  let currencyValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  let result = {
    status: 'OPEN',
    change: []
  };

  let totalCid = parseFloat(cid.map(total => total[1]).reduce((prev, curr) => prev + curr).toFixed(2));

  if (totalCid < changeDue) return (changeDueElt.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  if (totalCid === changeDue) result.status = 'CLOSED';

  for (let i = 0; i <= reversedCid.length; i++) {
    if (changeDue >= currencyValues[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];

      while (total > 0 && changeDue >= currencyValues[i]) {
        total -= currencyValues[i];
        changeDue = parseFloat((changeDue -= currencyValues[i]).toFixed(2));
        count++;
      }

      if (count > 0) {
        result.change.push([reversedCid[i][0], count * currencyValues[i]]);
      }
    }
  }

  if (changeDue > 0) return (changeDueElt.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');

  displayResults(result.status, result.change);
  updateCashRegister(result.change);
};

/**
 * Initializes event listeners for the form & purchase button
 * Then calls the updateCashRegister function
 */
const run = () => {
  formElt.addEventListener('submit', calculateCashRegister)
  updateCashRegister();
}

// ********** MAIN **********

run();
