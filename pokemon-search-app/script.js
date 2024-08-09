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

const statEltArray = [hpElt, attackElt, defenseElt, specialAttackElt, specialDefenseElt, speedElt];

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
 */
const setStats = (data) => {
  statEltArray.forEach((statElt, index) => statElt.textContent = data.stats[index].base_stat);
}

/**
 * Resets the display by removing the sprite element 
 * And setting the text content of various elements to empty strings.
 */
const resetDisplay = () => {
  if (spriteElt) spriteElt.remove();

  const infoEltArray = [nameElt, idElt, typesElt, heightElt, weightElt, ...statEltArray];
  infoEltArray.forEach(elt => elt.textContent = '');
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
    const POKEMON  = inputElt.value.toLowerCase();
    const response = await fetch(URL + POKEMON);
    const data     = await response.json();

    setInfos(data);
    setStats(data);

    typesElt.innerHTML = data.types
      .map(object => `<li class="type ${object.type.name}">${object.type.name}</li>`)
      .join('');

  } catch (error) {
    resetDisplay();
    alert('Pokemon not found');
  }
};

// ********** MAIN **********

formElt.addEventListener('submit', getPokemon);