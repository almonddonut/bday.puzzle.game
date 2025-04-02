const openingScreen = document.getElementById('opening-screen');
const puzzleContainer = document.getElementById('puzzle-container');
const startBtn = document.getElementById('start-btn');
const puzzleBoard = document.getElementById('puzzle-board');
const resetBtn = document.getElementById('reset-btn');
const finishBtn = document.getElementById('finish-btn');
const winMessage = document.getElementById('win-message');
const backgroundMusic = document.getElementById('background-music');
const winSound = document.getElementById('win-sound');

// Gambar puzzle yang akan dibagi (Gambar spesial kamu)
const imageUrl = 'bubu_dudu_puzzle.jpg';  // Ganti dengan foto spesial kamu

// Potongan gambar puzzle
const pieces = [
    { id: 1, x: 0, y: 0 }, { id: 2, x: 1, y: 0 }, { id: 3, x: 2, y: 0 },
    { id: 4, x: 0, y: 1 }, { id: 5, x: 1, y: 1 }, { id: 6, x: 2, y: 1 },
    { id: 7, x: 0, y: 2 }, { id: 8, x: 1, y: 2 }, { id: 9, x: 2, y: 2 },
];

// Menyiapkan potongan gambar
function createPieces() {
    puzzleBoard.innerHTML = '';
    pieces.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('piece');
        pieceElement.style.backgroundImage = `url(${imageUrl})`;
        pieceElement.style.backgroundPosition = `-${piece.x * 100}px -${piece.y * 100}px`;
        pieceElement.setAttribute('draggable', true);
        pieceElement.dataset.id = piece.id;
        pieceElement.addEventListener('dragstart', handleDragStart);
        pieceElement.addEventListener('dragover', handleDragOver);
        pieceElement.addEventListener('drop', handleDrop);
        puzzleBoard.appendChild(pieceElement);
    });
}

// Menghandle drag dan drop
function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.id);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text');
    const targetId = e.target.dataset.id;
    if (draggedId === targetId) {
        e.target.style.transform = 'scale(1.1)';
    }
}

// Memulai permainan
startBtn.addEventListener('click', () => {
    openingScreen.style.display = 'none';
    puzzleContainer.style.display = 'block';
    backgroundMusic.play();  // Mainkan musik latar
    createPieces();
});

// Reset puzzle
resetBtn.addEventListener('click', createPieces);

// Selesaikan game
finishBtn.addEventListener('click', () => {
    winSound.play();  // Mainkan suara efek kemenangan
    winMessage.style.display = 'block';  // Tampilkan pesan kemenangan
});

// Ketika puzzle selesai, tampilkan tombol "Finish"
function checkPuzzleCompleted() {
    // Logika untuk memeriksa apakah puzzle sudah selesai (contohnya menggunakan drag-and-drop)
    finishBtn.style.display = 'block';  // Menampilkan tombol Finish ketika puzzle selesai
}

// Memanggil fungsi checkPuzzleCompleted di setiap langkah untuk memeriksa apakah sudah selesai
// Bisa ditambahkan ke logika setelah tiap potongan dipindah

createPieces();
