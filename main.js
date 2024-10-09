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
    checkBorders()
    drawWalls(); // Tada piešiame sienas (juoda spalva)
    drawPlayer(); // Galiausiai piešiame žaidėją (raudonas kvadratas)
    checkCollision();
}

// Generuoja sienas atsitiktinėse vietose
function generateWalls() {
    for (let i = 0; i < 50; i++) {
        let randomX = Math.floor(Math.random() * gridSizeX) * squareSize;
        let randomY = Math.floor(Math.random() * gridSizeY) * squareSize;
        walls.push({ x: randomX, y: randomY });
    }
}

function checkCollision(newX, newY) {
    for (let i = 0; i < walls.length; i++) {
        if (newX === walls[i].x && newY === walls[i].y) {
            return true; // Grąžiname true, jei įvyko susidūrimas su siena
        }
    }
    return false; // Grąžiname false, jei susidūrimo nebuvo
}

// funkcija, neleidzianti eiti uz canvas ribu
function checkBorders() {
    if (playerX < 0) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = 0;
    }
    if (playerX > 1300) {
        playerX = 1300;
    }
    if (playerY > 700) {
        playerY = 700;
    }
    return playerX, playerY;
}
// Funkcija tikrina ar žaidėjas susidūrė su siena ir sustoja prieš sieną
function checkCollision(newX, newY) {
    for (let i = 0; i < walls.length; i++) {
        let wallX = walls[i].x;
        let wallY = walls[i].y;

        // Patikriname, ar žaidėjas juda į sieną iš kairės
        if (newX + playerSize > wallX && newX < wallX + squareSize && newY === wallY) {
            return true; // Susidūrimas iš kairės pusės
        }

        // Patikriname, ar žaidėjas juda į sieną iš viršaus
        if (newY + playerSize > wallY && newY < wallY + squareSize && newX === wallX) {
            return true; // Susidūrimas iš viršaus
        }
    }
    return false; // Jei susidūrimo nėra
}

// Funkcija skirta žaidėjo judėjimui
function movement(event) {
    let isAlignedX = playerX % squareSize === 0;
    let isAlignedY = playerY % squareSize === 0;

    const key = event.key;

    let newX = playerX;
    let newY = playerY;

    // Judėjimas į kairę
    if (key === 'a' && isAlignedY) {
        newX -= move;
        // Patikriname, ar sustojame prieš sieną
        if (!checkCollision(newX, playerY)) {
            playerX = newX;
        } else {
            playerX = Math.floor(playerX / squareSize) * squareSize; // Sustojame tiesiai prieš sieną
        }
    }

    // Judėjimas į viršų
    if (key === 'w' && isAlignedX) {
        newY -= move;
        if (!checkCollision(playerX, newY)) {
            playerY = newY;
        } else {
            playerY = Math.floor(playerY / squareSize) * squareSize; // Sustojame tiesiai prieš sieną
        }
    }

    // Judėjimas į dešinę
    if (key === 'd' && isAlignedY) {
        newX += move;
        if (!checkCollision(newX, playerY)) {
            playerX = newX;
        } else {
            playerX = Math.ceil(playerX / squareSize) * squareSize; // Sustojame tiesiai prieš sieną
        }
    }

    // Judėjimas į apačią
    if (key === 's' && isAlignedX) {
        newY += move;
        if (!checkCollision(playerX, newY)) {
            playerY = newY;
        } else {
            playerY = Math.ceil(playerY / squareSize) * squareSize; // Sustojame tiesiai prieš sieną
        }
    }

    updateCanvas(); // Atnaujiname Canvas po kiekvieno judėjimo
}


// Inicializacija
generateWalls(); // Sugeneruojame atsitiktines sienas
updateCanvas(); // Pradžioje atvaizduojame grid'ą, sienas ir žaidėją

// Įvykio klausytojas klaviatūros paspaudimams
window.addEventListener('keydown', movement);
