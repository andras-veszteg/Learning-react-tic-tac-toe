import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
function App() {
    const [activeplayer, setActivePlayer] = useState('X')
    
    function  handleSelectSquare(){
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
    }
    
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activeplayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activeplayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activeplayer} />
      </div>

      LOG
    </main>
  );
}

export default App
