# 🐍 Snake Game (React)

A simple browser‑based Snake game built with React.  
Originally made years ago as a learning project, now cleaned up and rewritten using modern React (hooks, functional components, cleaner game loop, etc).

The game runs entirely in the browser and uses percentage‑based positioning to keep things straightforward. Movement, collision checks, food spawning, and speed changes are all handled in React state.

---

## 🎮 Features

- Classic Snake gameplay  
- Arrow‑key controls  
- Snake grows when eating food  
- Speed increases as you play  
- Score counter  
- Game over detection (walls + self‑collision)  
- Restart button  
- Clean, simple UI

---

## 🧠 How it works

The game board is a 100×100 grid (percentage‑based).  
The snake moves in steps of `2%` each tick.

The main logic lives inside `App.js`:

- `snake` → array of `[x, y]` positions  
- `direction` → current movement direction  
- `food` → random coordinate  
- `speed` → interval delay (decreases as you eat)  
- `gameOver` → stops the loop when true  

Movement is handled with a `setInterval` inside a `useEffect`, and keyboard input is captured with a simple `keydown` listener.

Collision checks are done on each tick:

- Out of bounds  
- Snake head touching its own body  
- Snake head touching food  

When food is eaten, the snake grows by keeping its tail instead of removing it.

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The game will open at:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
src/
  App.js          // main game logic
  Snake.js        // renders snake segments
  Food.js         // renders food
  index.js        // React entry point
  index.css       // basic styling
```

---

## 🛠 Tech Stack

- React 18  
- Functional components  
- Hooks (`useState`, `useEffect`, `useCallback`)  
- Basic CSS for layout and styling  

---

## 📦 Notes

This project started as a small experiment while learning React.  
The current version is a cleaned‑up rewrite to make the code easier to read and maintain. It’s intentionally simple — no external game libraries, no fancy rendering, just plain React.

---

## 🐛 Known Things To Improve (Future Ideas)

- Add pause/resume  
- Add difficulty modes  
- Add high score saved in localStorage  
- Add sound effects  
- Add a grid background  
- Convert to TypeScript  
- Add tests for game logic  

---
