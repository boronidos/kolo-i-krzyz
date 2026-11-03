import { useState } from 'react'
import './App.css'

function App() {
  const [gameEnded, setGameEnded] = useState(false);
  const [player, setPlayer] = useState("x");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function setCell(x: number, y: number, sign: string) {
    if (board[x][y] != "") return;

    const newBoard = board.map(row => [...row]);
    newBoard[x][y] = sign;

    setBoard(newBoard);
    player == "x" ? setPlayer("o") : setPlayer("x");
    if (checkWinner(newBoard) != null) setGameEnded(true);

    if (newBoard[0][0] != "" && newBoard[0][1] != "" && newBoard[0][2] != "" && newBoard[1][0] != "" && newBoard[1][1] != "" && newBoard[1][2] != "" && newBoard[2][0] != "" && newBoard[2][1] != "" && newBoard[2][2] != "") {
      setGameEnded(true);
    }
  }

  function checkWinner(board: string[][]) {
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

    for (const line of lines) {
      if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }

    return null;
  }

  function restartGame() {
    setBoard([["", "", ""],["", "", ""],["", "", ""],]);
    setGameEnded(false);
  }

  return (
    <>
      <table>
        <tbody>
          <tr><Cell x={0} y={0}/> <Cell x={0} y={1}/><Cell x={0} y={2}/></tr>
          <tr><Cell x={1} y={0}/> <Cell x={1} y={1}/><Cell x={1} y={2}/></tr>
          <tr><Cell x={2} y={0}/> <Cell x={2} y={1}/><Cell x={2} y={2}/></tr>
        </tbody>
      </table>
      { gameEnded ? (<div className='ui'> <button onClick={() => restartGame()}>start new game</button> <p>{ checkWinner(board) != null ? "winner is: " + checkWinner(board) : "tie" }</p> </div>) : ( <div><p>current player: {player}</p></div> ) }
    </>
  )

  function Cell({x, y} : {x: number, y: number}) {
    return (
      <td onClick={() => setCell(x, y, player)}>{board[x][y]}</td>
    )
  }
}

export default App