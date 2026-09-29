import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns){
    let currentPlayer ='X'
    if(gameTurns.length > 0 && gameTurns[0].player ==='X') currentPlayer ='0'
    return currentPlayer
}



function App() {
    const [players, setPlayers]  = useState({'X':'Player 1', 'O': 'Player 2'});
    const [gameTurns, setGameTurns] = useState([]);
    // const [hasWinner, setHasWinner] = useState(false);
    //const [activeplayer, setActivePlayer] = useState('X')

    let activeplayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns){
        gameBoard[turn.square.row][turn.square.col] = turn.player;
    }
    
    let winner = null;
    for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        
        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol)
            winner = players[firstSquareSymbol];
    }
    
    const hasDraw = gameTurns.length === 9 && !winner;
    
    function  handleSelectSquare(rowIndex, colIndex,){
        //setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns(prevturns => {
            let currentPlayer = deriveActivePlayer(prevturns);
            
            const updatedPrevTurn = [{square:{row: rowIndex, col: colIndex}, player: currentPlayer},...prevturns];
            return updatedPrevTurn;
        });
    }

    function handleRestart(){
        setGameTurns([]);
    }
    
    function handlePlayerNameChange(symbol, newName){
        setPlayers(prevPlayers => {
            return {...prevPlayers, [symbol]: newName};
        });
    }
    
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activeplayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activeplayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard 
            onSelectSquare={handleSelectSquare} 
            board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;