# 🕹️ Cyber Maze Runner

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Technology](https://img.shields.io/badge/HTML5-Canvas-orange)
![Technology](https://img.shields.io/badge/CSS3-Neon-blue)
![Technology](https://img.shields.io/badge/JavaScript-ES6-yellow)

> **Cyber Maze Runner** is an interactive web-based game where the player navigates a "data packet" through a complex 30x30 orthogonal maze. The project features advanced HTML5 Canvas rendering, raw SVG coordinate collision detection, and an automated Breadth-First Search (BFS) pathfinding algorithm.

## ✨ Key Features

### 🎮 Gameplay
* **Interactive Controls:** Smooth character movement using keyboard arrow keys.
* **Visual Trail:** The player leaves a trail behind, visualizing the path taken.
* **Precision Timer:** Tracks gameplay time down to hundredths of a second.
* **High Scores:** Best times are saved locally in the browser (LocalStorage).

### ⚙️ Technical Highlights
* **SVG to Canvas Parsing:** The maze is not an image; it is generated from raw SVG coordinates (`<line>`) which are parsed and rendered using `ctx.moveTo` and `ctx.lineTo`.
* **Auto-Solve Algorithm:** Implements a **BFS (Breadth-First Search)** algorithm to calculate and animate the shortest path from start to finish.
* **Dynamic Collision Detection:** Converts vector lines into a logical Grid Map to handle wall collisions efficiently.
* **Cyberpunk UI:** Modern user interface with neon glow effects, animated particle background, and SVG icons.

---

## 🚀 Installation & Setup

Since this project relies on pure web technologies, no server or Node.js environment is required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/cyber-maze.git](https://github.com/your-username/cyber-maze.git)
    ```
2.  **Open the project folder.**
3.  **Run the game:**
    Simply double-click `index.html` to open it in your default web browser.

---

## 🕹️ How to Play

| Key / Button | Action |
| :--- | :--- |
| **⬆️ Arrow Up** | Move character Up |
| **⬇️ Arrow Down** | Move character Down |
| **⬅️ Arrow Left** | Move character Left |
| **➡️ Arrow Right** | Move character Right |
| **AUTO SOLVE** | Automatically solves the maze |
| **RESET** | Resets the game and timer |

**Objective:** Guide the red character from the starting point (top) to the **Green Zone** (bottom) in the shortest time possible.

---

## 📂 Project Structure

```text
cyber-maze/
├── index.html         # Main HTML structure and UI layout
├── styles/
│   └── style.css      # Neon/Cyberpunk styling and animations
├── js/
│   └── script.js      # Game logic, BFS algorithm, Canvas rendering
└── README.md          # Project documentation
