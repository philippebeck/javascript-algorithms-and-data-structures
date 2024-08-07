"use strict";

// ********** CONSTANTS **********

const URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const idElt             = document.querySelector('#pokemon-id');
const nameElt           = document.querySelector('#pokemon-name');
const spriteElt         = document.querySelector('#sprite');
const typesElt          = document.querySelector('#types');
const heightElt         = document.querySelector('#height');
const weightElt         = document.querySelector('#weight');
const hpElt             = document.querySelector('#hp');
const attackElt         = document.querySelector('#attack');
const defenseElt        = document.querySelector('#defense');
const specialAttackElt  = document.querySelector('#special-attack');
const specialDefenseElt = document.querySelector('#special-defense');
const speedElt          = document.querySelector('#speed');
const formElt           = document.querySelector('form');
const inputElt          = document.querySelector('#search-input');

// ********** FUNCTIONS **********

/**
 * Sets the information of a Pokemon on the page.
 *
 * @param {Object} data - The data object containing the information of the Pokemon.
 * @param {string} data.name - The name of the Pokemon.
 * @param {number} data.id - The ID of the Pokemon.
 * @param {number} data.weight - The weight of the Pokemon.
 * @param {number} data.height - The height of the Pokemon.
 * @param {Object} data.sprites - The sprites of the Pokemon.
 * @param {string} data.sprites.front_default - The URL of the front default sprite of the Pokemon.
 */
const setInfos = (data) => {
  nameElt.textContent   = `${data.name.toUpperCase()}`;
  idElt.textContent     = `#${data.id}`;
  weightElt.textContent = `Weight: ${data.weight}`;
  heightElt.textContent = `Height: ${data.height}`;

  spriteElt.innerHTML = `
    <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
  `;
}

/**
 * Sets the statistics of a Pokemon on the page.
 *
 * @param {Object} data - The data object containing the statistics of the Pokemon.
 * @param {Array} data.stats - The array of statistics of the Pokemon.
 * @param {number} data.stats[0].base_stat - The base stat of the HP.
 * @param {number} data.stats[1].base_stat - The base stat of the Attack.
 * @param {number} data.stats[2].base_stat - The base stat of the Defense.
 * @param {number} data.stats[3].base_stat - The base stat of the Special Attack.
 * @param {number} data.stats[4].base_stat - The base stat of the Special Defense.
 * @param {number} data.stats[5].base_stat - The base stat of the Speed.
 */
const setStats = (data) => {
  hpElt.textContent             = data.stats[0].base_stat;
  attackElt.textContent         = data.stats[1].base_stat;
  defenseElt.textContent        = data.stats[2].base_stat;
  specialAttackElt.textContent  = data.stats[3].base_stat;
  specialDefenseElt.textContent = data.stats[4].base_stat;
  speedElt.textContent          = data.stats[5].base_stat;
}

/**
 * Resets the display by removing the sprite element and setting the text content of various elements to empty strings.
 */
const resetDisplay = () => {
  if (spriteElt) spriteElt.remove();

  nameElt.textContent           = '';
  idElt.textContent             = '';
  typesElt.innerHTML            = '';
  heightElt.textContent         = '';
  weightElt.textContent         = '';
  hpElt.textContent             = '';
  attackElt.textContent         = '';
  defenseElt.textContent        = '';
  specialAttackElt.textContent  = '';
  specialDefenseElt.textContent = '';
  speedElt.textContent          = '';
};

/**
 * Retrieves Pokemon data from the PokeAPI and updates the display accordingly.
 *
 * @param {Event} e - The event object representing the form submission.
 * @return {Promise<void>} A promise that resolves when the display is updated.
 */
const getPokemon = async (e) => {
  e.preventDefault();

  try {
    const pokemon  = inputElt.value.toLowerCase();
    const response = await fetch(URL + pokemon);
    const data     = await response.json();

    setInfos(data);
    setStats(data);

    typesElt.innerHTML = data.types
      .map(object => `<li class="type ${object.type.name}">${object.type.name}</li>`)
      .join('');

  } catch (error) {
    resetDisplay();
    alert('Pokemon not found');
    console.error(`Pokemon not found: ${error}`);
  }
};

// ********** MAIN **********

formElt.addEventListener('submit', getPokemon);