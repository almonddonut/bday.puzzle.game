const openingScreen = document.getElementById('opening-screen');
const puzzleContainer = document.getElementById('puzzle-container');
const startBtn = document.getElementById('start-btn');
const puzzleBoard = document.getElementById('puzzle-board');
const finishBtn = document.getElementById('finish-btn');
const winMessage = document.getElementById('win-message');
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');

// Gambar puzzle yang akan dibagi
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

        pieceElement.addEventListener('dragstart', handleDragStart);
        pieceElement.addEventListener('dragover', handleDragOver);
        pieceElement.addEventListener('drop', handleDrop);
        pieceElement.addEventListener('dragend', checkPuzzleCompleted);

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
        draggedPiece.style.backgroundPosition = `-${pieces[targetId].x * 80}px -${pieces[targetId].y * 80}px`;
        targetPiece.style.backgroundPosition = `-${pieces[draggedId].x * 80}px -${pieces[draggedId].y * 80}px`;

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
    puzzleContainer.classList.add('fadeIn');
});

// Tombol Finish Game
finishBtn.addEventListener('click', () => {
    winSound.play();
    backgroundMusic.pause(); // Musik berhenti setelah game selesai
    winMessage.style.display = 'block';

    // Trigger confetti effect
    generateConfetti();
});

// Cek apakah puzzle sudah selesai
function checkPuzzleCompleted() {
    let completed = true;
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pieceElement = document.querySelector(`.piece[data-id='${piece.id}']`);

        if (piece.x !== piece.correctX || piece.y !== piece.correctY) {
            completed = false;
            break;
        }
    }

    if (completed) {
        finishBtn.style.display = 'block'; // Tampilkan tombol finish jika selesai
    }
}

// Confetti effect function
function generateConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize speed
        document.body.appendChild(confetti);
    }
}
