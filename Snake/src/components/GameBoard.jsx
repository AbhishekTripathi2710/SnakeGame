import { useEffect, useState } from "react";

const BOARD_SIZE = 20;

function GameBoard() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [pendingDirection, setPendingDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150); 

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newDirection = pendingDirection;

      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") newDirection = "UP";
          break;
        case "ArrowDown":
          if (direction !== "UP") newDirection = "DOWN";
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") newDirection = "LEFT";
          break;
        case "ArrowRight":
          if (direction !== "LEFT") newDirection = "RIGHT";
          break;
        default:
          break;
      }

      if (newDirection !== pendingDirection) {
        setPendingDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, pendingDirection]);

  const generateFood = (snake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (pendingDirection) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
          default:
            break;
        }

        if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE) {
          alert(`Game Over! Final Score: ${score}`);
          setScore(0);
          setSpeed(150);
          return [{ x: 10, y: 10 }];
        }

        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          alert(`Game Over! Final Score: ${score}`);
          setScore(0);
          setSpeed(150);
          return [{ x: 10, y: 10 }];
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;

            if (newScore % 50 === 0 && speed > 60) {
              setSpeed((prevSpeed) => prevSpeed - 10);
            }

            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
      setDirection(pendingDirection);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [pendingDirection, food, score, speed]);

  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      let className = "bg-gray-200 border border-gray-300";
      if (x === food.x && y === food.y) className = "bg-red-500";
      if (snake.some((segment) => segment.x === x && segment.y === y))
        className = "bg-green-500";
      cells.push(<div key={`${x}-${y}`} className={`${className} w-5 h-5`}></div>);
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Snake Game</h1>
      <p className="mb-2 text-lg">Score: {score}</p>
      <p className="text-sm text-gray-600 mb-4">Speed: {speed} ms</p>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

export default GameBoard;
