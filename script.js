const openingScreen = document.getElementById('opening-screen');
const puzzleContainer = document.getElementById('puzzle-container');
const startBtn = document.getElementById('start-btn');
const puzzleBoard = document.getElementById('puzzle-board');
const finishBtn = document.getElementById('finish-btn');
const winMessage = document.getElementById('win-message');
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');

// Gambar puzzle yang akan dibagi (gunakan gambar bubu_dudu_puzzle.jpg)
const imageUrl = 'bubu_dudu_puzzle.jpg'; // Ganti dengan foto spesial kamu

// Grid size
const gridSize = 6;
let pieces = [];

// Membuat potongan puzzle
function createPieces() {
    puzzleBoard.innerHTML = '';
    pieces.length = 0;

    const pieceWidth = 480 / gridSize; // Ukuran potongan berdasarkan grid

    for (let i = 0; i < gridSize * gridSize; i++) {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);

        const piece = {
            id: i,
            x: x,
            y: y,
            correctX: x,
            correctY: y,
        };

        pieces.push(piece);

        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.style.backgroundImage = `url(${imageUrl})`;
        pieceElement.style.width = `${pieceWidth}px`;
        pieceElement.style.height = `${pieceWidth}px`;
        pieceElement.style.backgroundPosition = `-${x * pieceWidth}px -${y * pieceWidth}px`;
        pieceElement.setAttribute('draggable', true);
        pieceElement.dataset.id = piece.id;

        pieceElement.add
