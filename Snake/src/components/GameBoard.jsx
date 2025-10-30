import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const BOARD_SIZE = 20;

function GameBoard() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [pendingDirection, setPendingDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const navigate = useNavigate();

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

  const isOnSnake = (x, y, snk = snake) => snk.some((segment) => segment.x === x && segment.y === y);
  const isOnObstacles = (x, y, obs = obstacles) => obs.some((o) => o.x === x && o.y === y);

  const generateFood = (snk = snake, obs = obstacles) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (isOnSnake(newFood.x, newFood.y, snk) || isOnObstacles(newFood.x, newFood.y, obs));
    return newFood;
  };

  const generateObstacles = (count, snk, fd) => {
    const newObs = [];
    while (newObs.length < count) {
      const candidate = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      const conflict = isOnSnake(candidate.x, candidate.y, snk) ||
                       (fd && candidate.x === fd.x && candidate.y === fd.y) ||
                       newObs.some((o) => o.x === candidate.x && o.y === candidate.y);
      if (!conflict) newObs.push(candidate);
    }
    return newObs;
  };

  useEffect(() => {
    setSnake([{ x: 10, y: 10 }]);
    const initialFood = { x: 5, y: 5 };
    setFood(initialFood);
    setDirection("RIGHT");
    setPendingDirection("RIGHT");
    setScore(0);
    setSpeed(150);
    setIsGameOver(false);
    setShowShake(false);
    const initialObstacles = generateObstacles(4, [{ x: 10, y: 10 }], initialFood);
    setObstacles(initialObstacles);
  }, []);

  useEffect(() => {
    if (isGameOver) {
      setShowShake(true);
      setTimeout(() => {
        setShowShake(false);
        navigate("/gameover", { state: { score } });
      }, 500);
      return;
    }

    const moveSnake = () => {
      setSnake((prevSnake) => {
        if (isGameOver) return prevSnake;
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

        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= BOARD_SIZE ||
          head.y >= BOARD_SIZE ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y) ||
          isOnObstacles(head.x, head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;
            if (newScore % 100 === 0 && speed > 60) {
              setSpeed((prevSpeed) => prevSpeed - 10);
              setObstacles((prevObs) => {
                const extra = generateObstacles(1, newSnake, food);
                return [...prevObs, ...extra];
              });
            }
            return newScore;
          });
          const nextFood = generateFood(newSnake, obstacles);
          setFood(nextFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
      setDirection(pendingDirection);
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [pendingDirection, food, score, speed, isGameOver, navigate, obstacles]);

  const cells = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      let className = "bg-[#1A1A1A]";
      if (isOnObstacles(x, y)) className = "bg-[#3A3A3A] shadow-[0_0_6px_#9D4EDD]";
      if (x === food.x && y === food.y) className = "bg-[#FF3C7D]";
      if (snake.some((segment) => segment.x === x && segment.y === y))
        className = "bg-[#00FF88] shadow-[0_0_8px_#00FF88]";
      cells.push(
        <div key={`${x}-${y}`} className={`${className} w-5 h-5 rounded-sm transition-all duration-75`} />
      );
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-start min-h-screen bg-[#0D0D0D] pt-10 transition-all duration-200 ${
        showShake ? "animate-shake" : ""
      }`}
    >
      <Header />
      <h1 className="text-2xl font-extrabold mb-2 text-[#EAEAEA]">Snake Game</h1>
      <p className="mb-2 text-lg text-[#FFD54F]">Score: {score}</p>
      <div
        className="grid bg-[#1A1A1A] rounded-md"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
          boxShadow: "0 0 15px #9D4EDD",
          padding: "2px",
        }}
      >
        {cells}
      </div>
      <Footer />
    </div>
  );
}

export default GameBoard;
