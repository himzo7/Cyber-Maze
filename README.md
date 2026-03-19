# 🕹️ Cyber Maze 

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Technology](https://img.shields.io/badge/HTML5-Canvas-orange)
![Technology](https://img.shields.io/badge/CSS3-Neon-blue)
![Technology](https://img.shields.io/badge/JavaScript-ES6-yellow)

> **Cyberpunk Auto-Maze Visualizer** is a sleek, automated web-based visualization tool. It demonstrates a "data packet" navigating through a complex 30x30 orthogonal maze. Built purely with HTML5 Canvas and JavaScript, it focuses on precise pathfinding animation and striking neon cyberpunk aesthetics.

## ✨ Key Features

### 🎮 Automated Visualization
* **Auto-Solve Only:** The maze is solved entirely by an automated pathfinding algorithm, creating a mesmerizing, hands-off visual experience.
* **Animated Trail:** The "packet" (character) leaves a precision-drawn trail behind as it navigates the complex grid.
* **Cinematic Completion:** Features synchronized audio triggers and a polished `SweetAlert2` modal upon successfully reaching the extraction zone.

### ⚙️ Technical Highlights
* **Raw Coordinate Rendering:** The maze is not a static image. The walls are rendered directly onto the Canvas using exact SVG-derived coordinate data (`ctx.moveTo` and `ctx.lineTo`), ensuring 100% perfect synchronization between the visual walls and the calculated path.
* **Pre-calculated Pathing:** The exact traversal path is defined by a grid-based coordinate system, simulating perfect routing.
* **Cyberpunk Aesthetics:** Features a modern, minimalist dark UI, glowing neon (`box-shadow` & `shadowBlur`) wall effects, and an ambient particle background (`tsParticles`).

---

## 🚀 Installation & Setup

Since this project relies on pure front-end web technologies, no server or Node.js environment is required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/cyber-maze.git](https://github.com/your-username/cyber-maze.git)
    ```
2.  **Open the project folder.**
3.  **Run the application:**
    Simply double-click `index.html` to open it in your default web browser.

---

## 🕹️ How to Use

This project is designed as an automated visualizer, removing the need for manual controls.

| Button | Action |
| :--- | :--- |
| **AUTO SOLVE** | Initiates the automated pathfinding sequence and triggers the audio. |
| **RESET GAME** | Instantly stops the animation and resets the data packet to the starting position. |
| **INFO (i)** | Opens the author credits modal. |

**Objective:** Sit back and watch the algorithm guide the red data packet from the insertion point to the **Green Zone** at the bottom right.

---

## 📂 Project Structure

```text
cyber-maze/
├── index.html         # Main UI layout and external library imports
├── styles/
│   └── style.css      # Dark theme styling, grid backgrounds, and layout
├── js/
│   └── script.js      # Animation loop, coordinate data, and Canvas rendering
├── music/
│   └── victory.mp3    # Audio asset triggered upon maze completion
└── README.md          # Project documentation
