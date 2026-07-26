import React, { useState, useEffect, useCallback } from "react";
import Snake from "./Snake";
import Food from "./Food";

const GRID_SIZE = 100;
const MOVE_STEP = 2;

const getRandomSpot = () => {
  const max = GRID_SIZE - MOVE_STEP;
  const x = Math.floor(Math.random() * max / MOVE_STEP) * MOVE_STEP;
  const y = Math.floor(Math.random() * max / MOVE_STEP) * MOVE_STEP;
  return [x, y];
};

const startingSnake = [
  [0, 0],
  [MOVE_STEP, 0]
];

const oppositeDir = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT"
};

const nextHeadPos = (head, dir) => {
  switch (dir) {
    case "RIGHT": return [head[0] + MOVE_STEP, head[1]];
    case "LEFT": return [head[0] - MOVE_STEP, head[1]];
    case "DOWN": return [head[0], head[1] + MOVE_STEP];
    case "UP": return [head[0], head[1] - MOVE_STEP];
    default: return head;
  }
};

const outOfBounds = ([x, y]) =>
  x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE;

const hitSelf = (snake) => {
  const head = snake[snake.length - 1];
  const body = snake.slice(0, -1);
  return body.some(dot => dot[0] === head[0] && dot[1] === head[1]);
};

const ateFood = (snake, food) => {
  const head = snake[snake.length - 1];
  return head[0] === food[0] && head[1] === food[1];
};

function App() {
  const [snake, setSnake] = useState(startingSnake);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomSpot);
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKey = useCallback((e) => {
    const key = e.keyCode;
    let newDir = direction;

    if (key === 38) newDir = "UP";
    if (key === 40) newDir = "DOWN";
    if (key === 37) newDir = "LEFT";
    if (key === 39) newDir = "RIGHT";

    if (snake.length > 1 && oppositeDir[direction] === newDir) {
      return;
    }

    setDirection(newDir);
  }, [direction, snake.length]);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[prevSnake.length - 1];
      const newHead = nextHeadPos(head, direction);
      const updatedSnake = [...prevSnake, newHead];

      if (outOfBounds(newHead) || hitSelf(updatedSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      if (ateFood(updatedSnake, food)) {
        setFood(getRandomSpot());
        setScore(s => s + 1);
        setSpeed(s => (s > 50 ? s - 10 : s));
        return updatedSnake;
      }

      return updatedSnake.slice(1);
    });
  }, [direction, food]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(moveSnake, speed);
    return () => clearInterval(timer);
  }, [moveSnake, speed, gameOver]);

  const restartGame = () => {
    setSnake(startingSnake);
    setDirection("RIGHT");
    setFood(getRandomSpot());
    setSpeed(200);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <h1>Snake Game</h1>
        <div className="game-info">
          <span>Score: {score}</span>
          <span>Speed: {speed}ms</span>
        </div>

        {gameOver && (
          <div className="game-over">
            <p>Game Over — Final Length: {snake.length}</p>
            <button onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>

      <div className="game-area">
        <Snake snakeDots={snake} />
        <Food dot={food} />
      </div>
    </div>
  );
}

export default App;
