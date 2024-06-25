import './TicTacToe.css';
import circleicon from '../../assets/circle.png';
import crossicon from '../../assets/cross.png';
import { useState } from 'react';

let data = ["", "", "", "", "", "", "", "", ""];

export default function TicTacToe() {
  let [count, setCount] = useState(1); // Start with 1 to make "O" appear first
  let [lock, setLock] = useState(false);

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (data[num] === "") { // Ensure the cell is not already filled
      if (count % 2 === 0) {
        e.target.innerHTML = `<img src='${crossicon}' alt='X'>`;
        data[num] = "x";
      } else {
        e.target.innerHTML = `<img src='${circleicon}' alt='O'>`;
        data[num] = "o";
      }
      setCount(count + 1);
      checkWinner();
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setLock(true);
        alert(`${data[a]} wins!`);
        return;
      }
    }

    if (!data.includes("")) {
      alert("It's a draw!");
      setLock(true);
    }
  };

  const resetGame = () => {
    data.fill("");
    setCount(1); // Reset to 1 to make "O" appear first again
    setLock(false);
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
  };

  return (
    <div className='container'>
      <h1 className="title">TicTacToe Game</h1>
      <div className="board">
        <div className="row1">
          <div className="box" onClick={(e) => { toggle(e, 0) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 1) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="box" onClick={(e) => { toggle(e, 3) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 4) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="box" onClick={(e) => { toggle(e, 6) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 7) }}></div>
          <div className="box" onClick={(e) => { toggle(e, 8) }}></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

