import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import {useState} from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if(gameTurns && gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function deriveWinner(gameboard, players) {
    let winner = undefined;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameboard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameboard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameboard[combination[2].row][combination[2].col];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function deriveGameboard(gameTurns) {
    let gameboard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameboard[row][col] = player;
    }

    return gameboard
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameboard = deriveGameboard(gameTurns);

    const winner = deriveWinner(gameboard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer();

            if (prevTurns.length > 0 &&  prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }

            return [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns
            ];
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <Gameboard
                    onSelectSquare={handleSelectSquare}
                    board={gameboard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
