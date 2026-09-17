import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";   


function deriveActivePlayer(gameTurns){
    let currentPlayer ='X'
    if(gameTurns.length > 0 && gameTurns[0].player ==='X') currentPlayer ='0'
    return currentPlayer
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    //const [activeplayer, setActivePlayer] = useState('X')

    let activeplayer =deriveActivePlayer(gameTurns);
    
    function  handleSelectSquare(rowIndex, colIndex,){
        //setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns(prevturns => {
            let currentPlayer = deriveActivePlayer(prevturns);
            
            const updatedPrevTurn = [{square:{row: rowIndex, col: colIndex}, player: currentPlayer},...prevturns];
            return updatedPrevTurn;
        });
    }
    
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activeplayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activeplayer === 'O'} />
        </ol>
        <GameBoard 
            onSelectSquare={handleSelectSquare} 
            turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
