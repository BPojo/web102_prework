/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

console.log(GAMES_JSON.length)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (var i = 0; i < games.length; i++) {
        console.log(games[i]);
        // console.log("adding object", obj);
        var obj = `<div class="game-card">
                        <p>${games[i].name}</p>
                        <img class="game-img" src=${games[i].img}>
                    </div>`;
        var el = document.createElement("div");
        el.innerHTML = obj;
        gamesContainer.appendChild(el);
    }
    

    
    

    // loop over each item in the data    

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    
}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

console.log("totalContributions", totalContributions.toLocaleString('en-US'));

// set the inner HTML using a template literal and toLocaleString to get a number with commas.
contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised.
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal.
raisedCard.innerHTML = '$' + totalRaised.toLocaleString('en-US')

// grab number of games card and set its inner HTML.
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Add an event listener for the "Unfunded Only" button
unfundedBtn.addEventListener('click', filterUnfundedOnly);

// Add an event listener for the "Funded Only" button
fundedBtn.addEventListener('click', filterFundedOnly);

// Add an event listener for the "Show All" button
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
// Change the variable name to totalMoneyRaised to avoid conflicts
const totalMoneyRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0).toLocaleString();
const totalGames = GAMES_JSON.length;
const gameWord = unfundedGamesCount === 1 ? 'game' : 'games';
const remainWord = unfundedGamesCount === 1 ? 'remains' : 'remain';
const displayStr = `A total of $${totalMoneyRaised} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} ${gameWord} ${remainWord} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.textContent = displayStr;
descriptionContainer.appendChild(paragraph);
/*************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Assuming GAMES_JSON is an array of game objects and each game object has a 'pledged' property
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;

// Create a new element to hold the name of the top pledged game, then append it to the correct element
const topGameElement = document.createElement('div');
topGameElement.innerHTML = `<h3>${topGame.name}</h3><p>Pledged: $${topGame.pledged.toLocaleString()}</p>`;
firstGameContainer.appendChild(topGameElement);

// Do the same for the runner-up item
const secondGameElement = document.createElement('div');
secondGameElement.innerHTML = `<h3>${secondGame.name}</h3><p>Pledged: $${secondGame.pledged.toLocaleString()}</p>`;
secondGameContainer.appendChild(secondGameElement);
