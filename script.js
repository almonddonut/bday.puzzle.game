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

// Potongan gambar puzzle
const pieces = [];
const gridSize = 6; // Ukuran grid 6x6

// Membuat potongan puzzle
function createPieces() {
    puzzleBoard.innerHTML = '';
    pieces.length = 0;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const piece = {
            id: i,
            x: x,
            y: y,
        };

        pieces.push(piece);

        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.style.backgroundImage = `url(${imageUrl})`;
        pieceElement.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
        pieceElement.setAttribute('draggable', true);
        pieceElement.dataset.id = piece.id;

        pieceElement.addEventListener('dragstart', handleDragStart);
        pieceElement.addEventListener('dragover', handleDragOver);
        pieceElement.addEventListener('drop', handleDrop);

        puzzleBoard.appendChild(pieceElement);
    }
}

// Menghandle drag dan drop
let draggedPiece = null;

function handleDragStart(e) {
    draggedPiece = e.target;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const targetPiece = e.target;
    if (draggedPiece !== targetPiece) {
        const draggedId = draggedPiece.dataset.id;
        const targetId = targetPiece.dataset.id;

        // Swap posisi potongan
        draggedPiece.style.backgroundPosition = `-${pieces[targetId].x * 100}px -${pieces[targetId].y * 100}px`;
        targetPiece.style.backgroundPosition = `-${pieces[draggedId].x * 100}px -${pieces[draggedId].y * 100}px`;

        // Swap data posisi potongan
        const temp = pieces[draggedId];
        pieces[draggedId] = pieces[targetId];
        pieces[targetId] = temp;
    }
}

// Tombol Start Game
startBtn.addEventListener('click', () => {
    openingScreen.style.display = 'none';
    puzzleContainer.style.display = 'block';
    backgroundMusic.play();
    createPieces();
});

// Tombol Finish Game
finishBtn.addEventListener('click', () => {
    winSound.play();
    winMessage.style.display = 'block';
});

// Cek apakah puzzle sudah selesai
function checkPuzzleCompleted() {
    let completed = true;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].id !== i) {
            completed = false;
            break;
        }
    }

    if (completed) {
        finishBtn.style.display = 'block'; // Tampilkan tombol finish jika selesai
    }
}

// Menambahkan cek puzzle selesai setiap kali ada perubahan
createPieces();
