const sprite = document.getElementById("display-sprite");
const move_container = document.getElementById("move-container");
// button pressed
const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", handleSearch);
// also works with enter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

const pname = document.getElementById("pokemon-name");
const audio = document.getElementById("pokemon-sound");


//color map
const colorGradients = {
    black:  { top: "#444444", bottom: "#0e0e10", font: "white", contrast: "rgba(178, 178, 178, 0.7)" },
    blue:   { top: "#44cffd", bottom: "#3366cc", font: "white", contrast: "rgba(153,204,255,0.7)" },
    brown:  { top: "#fc9246", bottom: "#a0522d", font: "white", contrast: "rgba(211,161,128,0.7)" },
    gray:   { top: "#e0e0e0", bottom: "#909090", font: "black", contrast: "rgba(144,144,144,0.7)" },
    green:  { top: "#78cb38", bottom: "#209020", font: "white", contrast: "rgba(168,230,162,0.7)" },
    pink:   { top: "#ff8b9c", bottom: "#ff445d", font: "white", contrast: "rgba(255,182,193,0.7)" },
    purple: { top: "#558bff", bottom: "#8454de", font: "white", contrast: "rgba(179,161,255,0.7)" },
    red:    { top: "#ff872c", bottom: "#f30000", font: "white", contrast: "rgba(255,153,153,0.7)" },
    white:  { top: "#ffffff", bottom: "#a0a0a0", font: "black", contrast: "rgba(217,217,217,0.7)" },
    yellow: { top: "#ffb731", bottom: "#ffd500", font: "black", contrast: "rgba(255,248,140,0.7)" }
};

const pokemonCache = new Map();
const speciesCache = new Map();

load_pokemon("6")

// gradeint
let currentPokemonData = null;
let currentGradient = colorGradients.green;

function load_pokemon(name)
{
    if (pokemonCache.has(name)) {
        const data = pokemonCache.get(name);
        currentPokemonData = data;
        displayPokemon(data);
        return;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    .then(response => response.json())
    .then(data => {

        pokemonCache.set(name, data);
        currentPokemonData = data; // store 

        displayPokemon(data);
    })
    .catch(error => console.error(error));
}

function displayPokemon(data) {
    // load image
    const imageUrl = data.sprites.front_default;
    sprite.src = imageUrl;

    // name
    let num = "No. " + data.id + " - "
    pname.textContent = num +  data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

    // load moves
    const selects = move_container.querySelectorAll(".move-select");
    const moves = data.moves.map(m => m.move.name);
    selects.forEach(select => select.innerHTML = "");

    moves.forEach(moveName => {
        selects.forEach(select => {
            const option = document.createElement("option");
            option.value = moveName;
            option.textContent = moveName.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            select.appendChild(option);

            // random move
            if (moves.length > 0) {
                const randomIndex = Math.floor(Math.random() * moves.length);
                select.selectedIndex = randomIndex;
            } 
        });
    });

    // load sound
    const cryUrl = data.cries["latest"];
    audio.src = cryUrl;
    audio.load(); // ready to play
    audio.play()

    if (speciesCache.has(data.species.url)) {
        const speciesData = speciesCache.get(data.species.url);
        applyGradient(speciesData.color.name);
    } else {
        fetch(data.species.url)
        .then(response => response.json())
        .then(speciesData => {
            speciesCache.set(data.species.url, speciesData);
            applyGradient(speciesData.color.name);
        });
    }
}

function applyGradient(colorName) {
    const gradient = colorGradients[colorName] || colorGradients.green; // fallback

    // gradient store
    currentGradient = gradient;

    document.documentElement.style.setProperty("--bg-color-1", gradient.top);
    document.documentElement.style.setProperty("--bg-color-2", gradient.bottom);
    document.documentElement.style.setProperty("--font-color", gradient.font);
    document.documentElement.style.setProperty("--contrast-color", gradient.contrast);
}

// search
function handleSearch() {
    const value = searchInput.value.trim();
    load_pokemon(value);
}

/// add pokemon

const addButton = document.querySelector(".add-pokmemon");
addButton.addEventListener("click", () => {
    if(currentPokemonData) {
        addPokemonToTeam(currentPokemonData, currentGradient);
    }
});

const teamContainer = document.querySelector("#members");

function addPokemonToTeam(pokemonData, gradient) {
    const membersContainer = document.getElementById("members");

    // team member
    const member = document.createElement("div");
    member.className = "team-member";
    // set background gradient
    member.style.background = `linear-gradient(-25deg, ${gradient.top}, ${gradient.bottom})`;
    // set font & contrast colors as CSS variables
    member.style.setProperty("--font-color", gradient.font);
    member.style.setProperty("--contrast-color", gradient.contrast);

    // container
    const imgContainer = document.createElement("div");
    imgContainer.className = "display-container"; //class

    const circle = document.createElement("img");
    circle.className = "circle";
    circle.src = "img/circle.svg";

    // sprite
    const spriteImg = document.createElement("img");
    spriteImg.className = "sprite";
    spriteImg.src = pokemonData.sprites.front_default;

    // decoration
    imgContainer.appendChild(circle);
    imgContainer.appendChild(spriteImg);

    // moves
    const ul = document.createElement("ul");
    const moves = pokemonData.moves.slice(0, 4);
    moves.forEach(m => {
        const li = document.createElement("li");
        li.textContent = m.move.name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        ul.appendChild(li);
    });

    member.appendChild(imgContainer);
    member.appendChild(ul);

    // append to team
    membersContainer.appendChild(member);
        audio.play()
}