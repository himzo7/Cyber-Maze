const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnSolve = document.getElementById("btn-solve");
const btnReset = document.getElementById("btn-reset");
const btnClearScores = document.getElementById("btn-clear-scores");
const timeVal = document.getElementById("time-val");
const scoreList = document.getElementById("score-list");

// --- CONFIG ---
const SCALE = 1.0; 
const ORIG_WIDTH = 484;
const ORIG_HEIGHT = 484;

canvas.width = ORIG_WIDTH * SCALE;
canvas.height = ORIG_HEIGHT * SCALE;
ctx.scale(SCALE, SCALE); 

const CELL_SIZE = 16;
const OFFSET = 2;
const COLS = 30;
const ROWS = 30;

// SVG Lines
const rawLines = [
  [2,2,226,2], [242,2,482,2], [2,18,50,18], [130,18,146,18], [210,18,226,18], [242,18,258,18], [290,18,338,18], [354,18,370,18], [386,18,402,18], [418,18,466,18],
  [18,34,34,34], [50,34,66,34], [82,34,114,34], [146,34,178,34], [242,34,290,34], [338,34,354,34], [370,34,402,34], [18,50,50,50], [98,50,130,50], [146,50,162,50],
  [178,50,194,50], [210,50,242,50], [258,50,274,50], [322,50,338,50], [466,50,482,50], [2,66,18,66], [34,66,66,66], [82,66,98,66], [130,66,146,66], [162,66,178,66],
  [194,66,210,66], [226,66,258,66], [306,66,322,66], [354,66,386,66], [450,66,466,66], [18,82,34,82], [66,82,114,82], [146,82,162,82], [178,82,194,82], [210,82,226,82],
  [274,82,306,82], [322,82,338,82], [370,82,402,82], [418,82,466,82], [66,98,178,98], [242,98,290,98], [338,98,354,98], [402,98,418,98], [450,98,482,98], [50,114,82,114],
  [162,114,194,114], [226,114,258,114], [290,114,322,114], [386,114,402,114], [434,114,450,114], [34,130,50,130], [66,130,162,130], [210,130,226,130], [306,130,338,130],
  [2,146,50,146], [130,146,178,146], [290,146,322,146], [354,146,370,146], [402,146,418,146], [18,162,66,162], [98,162,130,162], [210,162,258,162], [274,162,402,162],
  [418,162,450,162], [50,178,82,178], [114,178,146,178], [194,178,210,178], [226,178,242,178], [258,178,274,178], [306,178,354,178], [402,178,418,178], [434,178,450,178],
  [2,194,34,194], [66,194,82,194], [146,194,194,194], [274,194,306,194], [322,194,338,194], [386,194,402,194], [418,194,466,194], [50,210,66,210], [114,210,146,210],
  [194,210,226,210], [258,210,274,210], [306,210,322,210], [354,210,386,210], [450,210,482,210], [2,226,18,226], [34,226,66,226], [98,226,130,226], [146,226,178,226],
  [210,226,226,226], [274,226,290,226], [338,226,354,226], [386,226,402,226], [418,226,450,226], [18,242,34,242], [66,242,98,242], [114,242,162,242], [194,242,210,242],
  [226,242,242,242], [258,242,274,242], [306,242,338,242], [354,242,386,242], [402,242,418,242], [50,258,114,258], [130,258,162,258], [210,258,226,258], [274,258,306,258],
  [322,258,338,258], [354,258,370,258], [386,258,402,258], [18,274,50,274], [98,274,130,274], [162,274,210,274], [226,274,242,274], [274,274,290,274], [306,274,322,274],
  [338,274,354,274], [370,274,386,274], [434,274,466,274], [50,290,66,290], [82,290,98,290], [114,290,146,290], [194,290,274,290], [322,290,338,290], [370,290,434,290],
  [450,290,482,290], [2,306,50,306], [66,306,82,306], [98,306,130,306], [146,306,162,306], [178,306,194,306], [274,306,322,306], [354,306,370,306], [402,306,450,306],
  [466,306,482,306], [18,322,34,322], [130,322,178,322], [194,322,226,322], [258,322,274,322], [306,322,338,322], [354,322,386,322], [418,322,466,322], [34,338,82,338],
  [98,338,130,338], [162,338,178,338], [242,338,290,338], [306,338,338,338], [386,338,418,338], [2,354,66,354], [146,354,162,354], [178,354,194,354], [210,354,258,354],
  [322,354,418,354], [434,354,450,354], [18,370,98,370], [114,370,146,370], [178,370,226,370], [306,370,322,370], [354,370,370,370], [418,370,434,370], [450,370,466,370],
  [98,386,114,386], [146,386,178,386], [194,386,210,386], [242,386,274,386], [290,386,306,386], [322,386,418,386], [434,386,450,386], [18,402,66,402], [82,402,98,402],
  [130,402,210,402], [274,402,322,402], [338,402,354,402], [386,402,402,402], [418,402,434,402], [450,402,482,402], [66,418,82,418], [98,418,114,418], [210,418,274,418],
  [322,418,338,418], [418,418,466,418], [34,434,66,434], [82,434,178,434], [194,434,226,434], [258,434,322,434], [434,434,450,434], [2,450,34,450], [98,450,162,450],
  [178,450,226,450], [242,450,306,450], [322,450,354,450], [386,450,434,450], [450,450,466,450], [34,466,50,466], [146,466,210,466], [226,466,242,466], [274,466,290,466],
  [306,466,322,466], [354,466,370,466], [434,466,482,466], [2,482,242,482], [258,482,482,482], [2,2,2,482], [18,82,18,114], [18,130,18,146], [18,162,18,178],
  [18,210,18,226], [18,242,18,290], [18,338,18,354], [18,386,18,450], [18,466,18,482], [34,34,34,130], [34,162,34,242], [34,258,34,274], [34,290,34,306],
  [34,322,34,338], [34,370,34,386], [34,402,34,418], [50,82,50,114], [50,178,50,210], [50,242,50,258], [50,306,50,338], [50,370,50,386], [50,418,50,466],
  [66,2,66,82], [66,114,66,130], [66,146,66,162], [66,258,66,290], [66,306,66,322], [66,386,66,434], [66,450,66,482], [82,2,82,18], [82,34,82,66], [82,130,82,242],
  [82,258,82,274], [82,290,82,306], [82,322,82,354], [82,370,82,402], [82,434,82,466], [98,18,98,34], [98,50,98,66], [98,98,98,114], [98,146,98,194], [98,210,98,226],
  [98,274,98,370], [98,402,98,418], [98,450,98,466], [114,2,114,18], [114,66,114,82], [114,114,114,146], [114,178,114,210], [114,242,114,274], [114,322,114,338],
  [114,354,114,370], [114,386,114,418], [114,466,114,482], [130,34,130,114], [130,146,130,162], [130,178,130,194], [130,226,130,242], [130,306,130,322],
  [130,338,130,354], [130,370,130,418], [130,450,130,482], [146,18,146,50], [146,66,146,82], [146,114,146,130], [146,162,146,178], [146,194,146,226], [146,258,146,306],
  [146,338,146,370], [146,418,146,434], [162,2,162,18], [162,50,162,66], [162,98,162,130], [162,146,162,210], [162,274,162,306], [162,338,162,354], [162,370,162,386],
  [162,402,162,418], [178,18,178,50], [178,66,178,98], [178,130,178,178], [178,210,178,274], [178,290,178,338], [178,354,178,386], [178,418,178,450], [194,2,194,34],
  [194,98,194,178], [194,194,194,226], [194,258,194,290], [194,322,194,354], [194,402,194,434], [210,34,210,50], [210,66,210,130], [210,146,210,194], [210,226,210,258],
  [210,290,210,322], [210,338,210,354], [210,386,210,402], [210,466,210,482], [226,2,226,34], [226,98,226,146], [226,178,226,226], [226,306,226,354], [226,370,226,418],
  [226,434,226,466], [242,34,242,82], [242,130,242,162], [242,178,242,274], [242,306,242,338], [242,370,242,402], [242,418,242,450], [242,466,242,482], [258,2,258,18],
  [258,66,258,98], [258,114,258,290], [258,306,258,322], [258,338,258,370], [258,402,258,418], [258,450,258,482], [274,18,274,34], [274,50,274,82], [274,98,274,162],
  [274,258,274,274], [274,290,274,322], [274,354,274,402], [274,418,274,434], [290,34,290,66], [290,98,290,146], [290,162,290,178], [290,194,290,258], [290,274,290,290],
  [290,322,290,386], [290,402,290,418], [290,466,290,482], [306,18,306,98], [306,178,306,194], [306,210,306,242], [306,258,306,306], [306,322,306,370], [306,386,306,402],
  [306,418,306,434], [306,450,306,466], [322,34,322,50], [322,82,322,114], [322,194,322,226], [322,370,322,386], [322,402,322,418], [322,434,322,450], [338,18,338,34],
  [338,50,338,82], [338,98,338,162], [338,210,338,242], [338,258,338,322], [338,354,338,370], [338,418,338,434], [338,450,338,466], [354,2,354,18], [354,34,354,114],
  [354,130,354,146], [354,178,354,226], [354,242,354,258], [354,274,354,306], [354,322,354,338], [354,370,354,386], [354,402,354,450], [370,18,370,50], [370,82,370,146],
  [370,162,370,194], [370,226,370,242], [370,258,370,274], [370,290,370,306], [370,338,370,354], [370,386,370,402], [370,418,370,482], [386,50,386,66], [386,98,386,162],
  [386,178,386,210], [386,242,386,258], [386,306,386,338], [386,354,386,386], [386,402,386,466], [402,18,402,98], [402,130,402,146], [402,162,402,178], [402,194,402,226],
  [402,258,402,290], [402,306,402,322], [402,354,402,370], [402,402,402,434], [402,450,402,466], [418,2,418,82], [418,98,418,162], [418,178,418,290], [418,322,418,338],
  [418,370,418,386], [418,418,418,434], [418,466,418,482], [434,34,434,82], [434,98,434,146], [434,194,434,210], [434,242,434,274], [434,322,434,370], [434,386,434,418],
  [434,434,434,466], [450,18,450,66], [450,98,450,114], [450,130,450,178], [450,226,450,258], [450,290,450,322], [450,338,450,354], [450,386,450,402], [466,34,466,50],
  [466,114,466,194], [466,210,466,274], [466,322,466,386], [466,418,466,450], [482,2,482,482]
];

// Game State
let player = { x: 14, y: 0 };
let visualPlayer = { x: 14, y: 0 }; // Za animacijo karakterja
let end = { x: 15, y: 29 };
let pathHistory = [];
let isSolving = false;
let isGameActive = true;
let grid = [];

// Zvezno premikanje
let keys = {};
let lastMoveTime = 0;
let firstPressDelay = {}; // Shrani čas za začetni zamik
const MOVE_INTERVAL = 100; // Čas med premiki, KO DRŽIŠ tipko
const HOLD_DELAY = 200;    // Čas, ki mora miniti preden se začne avtomatsko ponavljanje

// Timer
let timerInterval = null;
let startTime = 0;
let isTimerRunning = false;

// Init
initGame();
loadHighScores();

// Če uporabljaš tsParticles (zunanja knjižnica, poskrbi, da je naložena v HTML-ju)
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("particles", {
        particles: { 
            number: { value: 70 }, 
            color: { value: "#66fcf1" }, 
            opacity: { value: 0.2 }, 
            size: { value: 2 }, 
            move: { enable: true, speed: 0.6 } 
        }
    });
}

// ------------------------------------
// 1. GAME CONTROL
// ------------------------------------

function initGame() {
    stopTimer();
    updateTimerDisplay(0);
    isSolving = false;
    isGameActive = true;
    btnSolve.disabled = false;
    
    player = { x: 14, y: 0 };
    visualPlayer = { x: 14, y: 0 };
    pathHistory = [{x: 14, y: 0}];
    keys = {};
    firstPressDelay = {};
    
    if(grid.length === 0) buildLogicalGrid();
}

function resetGame() {
    isSolving = false; // USTAVI AUTO SOLVE!
    isGameActive = true;
    stopTimer();
    updateTimerDisplay(0);
    btnSolve.disabled = false;
    
    player = { x: 14, y: 0 };
    visualPlayer = { x: 14, y: 0 };
    pathHistory = [{x: 14, y: 0}];
    keys = {};
    firstPressDelay = {};
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ------------------------------------
// 2. DRAWING
// ------------------------------------

function drawMaze() {
    ctx.beginPath();
    ctx.strokeStyle = "#66fcf1"; 
    ctx.lineWidth = 1.5;         
    ctx.lineCap = "square";

    rawLines.forEach(line => {
        const [x1, y1, x2, y2] = line;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    });
    ctx.stroke();
}

function drawPlayerSprite(x, y, size) {
    ctx.save();
    ctx.translate(x + size/2, y + size/2);
    
    // Character Body
    ctx.fillStyle = "#ff2e63"; 
    ctx.beginPath();
    ctx.arc(0, 0, size/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(-3, -2, 2, 0, Math.PI * 2);
    ctx.arc(3, -2, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMaze();

    // Trail
    if (pathHistory.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 46, 99, 0.5)"; 
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        
        const startX = pathHistory[0].x * CELL_SIZE + OFFSET + CELL_SIZE/2;
        const startY = pathHistory[0].y * CELL_SIZE + OFFSET + CELL_SIZE/2;
        ctx.moveTo(startX, startY);

        for (let i = 1; i < pathHistory.length - 1; i++) {
            const px = pathHistory[i].x * CELL_SIZE + OFFSET + CELL_SIZE/2;
            const py = pathHistory[i].y * CELL_SIZE + OFFSET + CELL_SIZE/2;
            ctx.lineTo(px, py);
        }
        
        // Sled potegnemo do animirane pozicije lika
        const fx = visualPlayer.x * CELL_SIZE + OFFSET + CELL_SIZE/2;
        const fy = visualPlayer.y * CELL_SIZE + OFFSET + CELL_SIZE/2;
        ctx.lineTo(fx, fy);
        
        ctx.stroke();
    }

    // Player (uporabimo visualPlayer za gladkost)
    const px = visualPlayer.x * CELL_SIZE + OFFSET;
    const py = visualPlayer.y * CELL_SIZE + OFFSET;
    drawPlayerSprite(px, py, CELL_SIZE);

    // Goal
    const ex = end.x * CELL_SIZE + OFFSET;
    const ey = end.y * CELL_SIZE + OFFSET;
    ctx.fillStyle = "#00ff41"; 
    ctx.globalAlpha = 0.6;
    ctx.fillRect(ex, ey, CELL_SIZE, CELL_SIZE);
    ctx.globalAlpha = 1.0;
}

// ------------------------------------
// 3. MOVEMENT & LOGIC
// ------------------------------------

document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); 
        
        // Če tipka še ni bila pritisnjena, naredimo TAKOJŠEN premik
        if (!keys[e.key]) {
            keys[e.key] = true;
            // Nastavimo, kdaj se lahko začne neprekinjeno premikanje
            firstPressDelay[e.key] = performance.now() + HOLD_DELAY; 
            
            let dx = 0, dy = 0;
            if (e.key === "ArrowUp") dy = -1;
            else if (e.key === "ArrowDown") dy = 1;
            else if (e.key === "ArrowLeft") dx = -1;
            else if (e.key === "ArrowRight") dx = 1;

            if (!isSolving && isGameActive) {
                if (!isTimerRunning) startTimer();
                tryMove(dx, dy);
            }
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        keys[e.key] = false;
    }
});

function tryMove(dx, dy) {
    const cx = player.x;
    const cy = player.y;
    const nx = cx + dx;
    const ny = cy + dy;

    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;

    const cell = grid[cy][cx];
    if (dx === 1 && cell.right) return;
    if (dx === -1 && cell.left) return;
    if (dy === 1 && cell.bottom) return;
    if (dy === -1 && cell.top) return;

    player.x = nx;
    player.y = ny;
    
    // Brisane presežka poti, če gremo po starih stopinjah
    const existingIndex = pathHistory.findIndex(p => p.x === nx && p.y === ny);
    if (existingIndex !== -1) {
        pathHistory = pathHistory.slice(0, existingIndex + 1);
    } else {
        pathHistory.push({x: nx, y: ny});
    }

    if (nx === end.x && ny === end.y) {
        winGame();
        keys = {}; // Prepreči nadaljnje premikanje v ozadju
    }
}

// GAME LOOP ZA GLADKO ANIMACIJO
function gameLoop(timestamp) {
    requestAnimationFrame(gameLoop);

    // Hitro premikanje ob držanju tipke
    if (!isSolving && isGameActive) {
        let dx = 0, dy = 0;
        let activeKey = null;

        if (keys["ArrowUp"]) { dy = -1; activeKey = "ArrowUp"; }
        else if (keys["ArrowDown"]) { dy = 1; activeKey = "ArrowDown"; }
        else if (keys["ArrowLeft"]) { dx = -1; activeKey = "ArrowLeft"; }
        else if (keys["ArrowRight"]) { dx = 1; activeKey = "ArrowRight"; }

        if (activeKey && (dx !== 0 || dy !== 0)) {
            // Preverimo, če smo že presegli začetni zamik IN interval
            if (timestamp > firstPressDelay[activeKey] && (timestamp - lastMoveTime > MOVE_INTERVAL)) {
                if (!isTimerRunning) startTimer();
                tryMove(dx, dy);
                lastMoveTime = timestamp;
            }
        }
    }

    // Gladka interpolacija (Lerp) med kvadratki
    visualPlayer.x += (player.x - visualPlayer.x) * 0.4;
    visualPlayer.y += (player.y - visualPlayer.y) * 0.4;

    draw(); // Posodobi platno
}
// Zaženemo glavno zanko igre
requestAnimationFrame(gameLoop);

// ------------------------------------
// 4. TIMER
// ------------------------------------

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        updateTimerDisplay(elapsed);
    }, 10);
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
}

function updateTimerDisplay(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);

    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');
    const cStr = centis.toString().padStart(2, '0');

    timeVal.innerText = `${mStr}:${sStr}.${cStr}`;
    return `${mStr}:${sStr}.${cStr}`;
}

function winGame() {
    stopTimer();
    isGameActive = false;
    const finalTimeMs = Date.now() - startTime;
    const timeString = updateTimerDisplay(finalTimeMs);
    
    if (!isSolving) {
        saveHighScore(finalTimeMs, timeString);
        Swal.fire({
            title: 'MISSION COMPLETE!',
            text: `Finished in ${timeString}`,
            icon: 'success',
            background: '#1f2833',
            color: '#66fcf1',
            confirmButtonColor: '#45a29e'
        });
    } else {
        Swal.fire({
            title: 'SOLVED',
            text: 'Auto-solve completed.',
            icon: 'info',
            background: '#1f2833',
            color: '#ccc',
            confirmButtonColor: '#45a29e'
        });
    }
}

// ------------------------------------
// 5. HIGH SCORES
// ------------------------------------

function saveHighScore(ms, timeString) {
    let scores = JSON.parse(localStorage.getItem('mazeScores_eng')) || [];
    scores.push({ ms: ms, str: timeString, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => a.ms - b.ms);
    scores = scores.slice(0, 5);
    localStorage.setItem('mazeScores_eng', JSON.stringify(scores));
    loadHighScores();
}

function loadHighScores() {
    let scores = JSON.parse(localStorage.getItem('mazeScores_eng')) || [];
    scoreList.innerHTML = "";
    
    if (scores.length === 0) {
        scoreList.innerHTML = "<li>No records yet</li>";
        return;
    }
    
    scores.forEach((s, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>#${index+1} ${s.str}</span> <span style="font-size:0.8em; color:#666">${s.date}</span>`;
        scoreList.appendChild(li);
    });
}

btnClearScores.onclick = () => {
    localStorage.removeItem('mazeScores_eng');
    loadHighScores();
};

// ------------------------------------
// 6. BUILD GRID
// ------------------------------------
function buildLogicalGrid() {
    grid = [];
    for(let r=0; r<ROWS; r++) {
        let row = [];
        for(let c=0; c<COLS; c++) {
            row.push({ top: false, right: false, bottom: false, left: false });
        }
        grid.push(row);
    }

    rawLines.forEach(line => {
        const [x1, y1, x2, y2] = line;
        if (y1 === y2) { // Horizontal
            const r = Math.round((y1 - OFFSET) / CELL_SIZE); 
            const startCol = Math.round((x1 - OFFSET) / CELL_SIZE);
            const endCol = Math.round((x2 - OFFSET) / CELL_SIZE);
            for (let c = startCol; c < endCol; c++) {
                if (r < ROWS) grid[r][c].top = true;
                if (r > 0) grid[r-1][c].bottom = true;
            }
        } else if (x1 === x2) { // Vertical
            const c = Math.round((x1 - OFFSET) / CELL_SIZE);
            const startRow = Math.round((y1 - OFFSET) / CELL_SIZE);
            const endRow = Math.round((y2 - OFFSET) / CELL_SIZE);
            for (let r = startRow; r < endRow; r++) {
                if (c < COLS) grid[r][c].left = true;
                if (c > 0) grid[r][c-1].right = true;
            }
        }
    });
}

// ------------------------------------
// 7. AUTO SOLVE
// ------------------------------------
btnSolve.onclick = function() {
    if(isSolving) return;
    
    isSolving = true;
    startTimer();
    btnSolve.disabled = true;

    let queue = [player];
    let visited = new Set();
    visited.add(`${player.x},${player.y}`);
    let parents = {}; 

    let found = false;
    let finalNode = null;

    while (queue.length > 0) {
        let curr = queue.shift();
        
        if (curr.x === end.x && curr.y === end.y) {
            found = true;
            finalNode = curr;
            break;
        }

        const moves = [
            { dx: 0, dy: -1, wall: 'top' },
            { dx: 0, dy: 1, wall: 'bottom' },
            { dx: -1, dy: 0, wall: 'left' },
            { dx: 1, dy: 0, wall: 'right' }
        ];

        for (let m of moves) {
            let nx = curr.x + m.dx;
            let ny = curr.y + m.dy;
            
            if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
                if (!grid[curr.y][curr.x][m.wall]) {
                    let key = `${nx},${ny}`;
                    if (!visited.has(key)) {
                        visited.add(key);
                        parents[key] = curr;
                        queue.push({x: nx, y: ny});
                    }
                }
            }
        }
    }

    if (found) {
        let path = [];
        let curr = finalNode;
        while (curr.x !== player.x || curr.y !== player.y) {
            path.unshift(curr);
            curr = parents[`${curr.x},${curr.y}`];
        }
        animateSolution(path);
    } else {
        isSolving = false;
        btnSolve.disabled = false;
        stopTimer();
        Swal.fire("Error", "No path found.", "error");
    }
};

function animateSolution(path) {
    let i = 0;
    function step() {
        if (!isSolving) return; // VAROVALKA: Prekinitev ob kliku na RESET

        if (i >= path.length) {
            winGame();
            return;
        }
        player = path[i];
        
        // Logika brisanja uporabljena tudi tukaj
        const existingIndex = pathHistory.findIndex(p => p.x === player.x && p.y === player.y);
        if (existingIndex !== -1) {
            pathHistory = pathHistory.slice(0, existingIndex + 1);
        } else {
            pathHistory.push({x: player.x, y: player.y});
        }

        i++;
        setTimeout(step, 80);
    }
    step();
}

btnReset.onclick = resetGame;
