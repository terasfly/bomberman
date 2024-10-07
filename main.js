const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Kvadrato dydis
const gridSizeX = 14;
const gridSizeY = 8;
const squareSize = 100;

// Nustatome kontūro spalvą (raudona) ir linijos storį
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;


// player draw
let playerX = 0;
let playerY = 0;
let playerSize = 100; // player is full of one square

let walls = []; // Masyvas sienoms
let move = 50; // Apibrėžiame 'move' prieš naudojant jį funkcijoje

// Pagrindinis grid'o piešimas
function drawGrid() {
    for (let row = 0; row < gridSizeY; row++) {
        for (let col = 0; col < gridSizeX; col++) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
            ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);

        }
    }
}
// find a number


// Funkcija piešti žmogelį (kvadratą)
function drawPlayer() {
    ctx.fillStyle = 'red'; // Žmogelio spalva
    ctx.fillRect(playerX, playerY, playerSize, playerSize); // Žmogelis (raudonas kvadratas)
}

// Funkcija piešti sienas su juoda spalva
function drawWalls() {
    ctx.fillStyle = 'black'; // Nustatome juodą spalvą sienoms
    for (let i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i].x, walls[i].y, squareSize, squareSize); // Piešiame kiekvieną sieną
    }
}

// Funkcija atnaujinti Canvas (piešia grid, sienas ir žmogelį)
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Išvalo Canvas
    drawGrid(); // Pirma piešiame grid'ą (mėlyni kvadratai)
    drawWalls(); // Tada piešiame sienas (juoda spalva)
    drawPlayer(); // Galiausiai piešiame žaidėją (raudonas kvadratas)
}

// Generuoja sienas atsitiktinėse vietose
function generateWalls() {
    for (let i = 0; i < 70; i++) {
        let randomX = Math.floor(Math.random() * gridSizeX) * squareSize;
        let randomY = Math.floor(Math.random() * gridSizeY) * squareSize;
        walls.push({ x: randomX, y: randomY });
    }
}

// Funkcija skirta žaidėjo judėjimui
function movement(event) {
    let isAlignedX = playerX % 100 === 0;
    let isAlignedY = playerY % 100 === 0;

    const key = event.key;

    if (key === 'a' && (isAlignedX && isAlignedY || !isAlignedX && isAlignedY)) {
        playerX -= move;
    }
    if (key === 'w' && (isAlignedY && isAlignedX || !isAlignedY && isAlignedX)) {
        playerY -= move;
    }
    if (key === 'd' && (isAlignedX && isAlignedY || !isAlignedX && isAlignedY)) {
        playerX += move;
    }
    if (key === 's' && (isAlignedY && isAlignedX || !isAlignedY && isAlignedX)) {
        playerY += move;
    }

    updateCanvas(); // Atjauniname Canvas po kiekvieno judėjimo
}

// Inicializacija
generateWalls(); // Sugeneruojame atsitiktines sienas
updateCanvas(); // Pradžioje atvaizduojame grid'ą, sienas ir žaidėją

// Įvykio klausytojas klaviatūros paspaudimams
window.addEventListener('keydown', movement);
