type Player = 'X' | 'O' | null | 'DRAW';
import { useState, useEffect } from 'react'
import Square from '../component/Square';

//To calculate the winner
function calculateWinner(squares: Player[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b]
            && squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }

    return null;
}

function Board() {

    const [squares, setSquares] = useState(Array(9).fill(null));

    //setting the currentPlayer randomly to either X or O
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    )
    const URL = "../punlic/clicking_the_crossbox.mp3";
    // <Player> signifies that the type of winner is of type Player
    const [winner, setWinner] = useState<Player>(null);

    // To set the value in a square to either X or O
    function setSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if (i === index) {
                return currentPlayer;
            }
            return val;
        })
        setSquares(newData);
        new Audio('clicking_the_crossbox.mp3').play();
        //Interchanging the value between X and O
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    // to reset the game
    function reset() {
        new Audio('restart.mp3').play();
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    }


    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w);
        }

        if (!w && !squares.filter((square) => !square).length) {
            setWinner("DRAW");
        }
    });

    function victory() {
        new Audio('victory.mp3').play();
    }

    return (
        <div className='container'>

            {!winner && <p>
                HEY {currentPlayer}, IT'S YOUR TURN NOW!!
            </p>}
            {winner && victory()}
            {winner && winner !== "DRAW" && <p>CONGRATS {winner}, YOU WON !! </p>}

            {winner && winner === "DRAW" && <p>DRAW </p>}

            <div className='grid'>
                {
                    Array(9).fill(null).map((_, i) => {
                        return (
                            <Square
                                winner={winner}
                                key={i}
                                onClick={() => setSquareValue(i)}
                                value={squares[i]}
                            />
                        );
                    })
                }
            </div>

            <button className='reset' onClick={reset}>RESET</button>
        </div>
    )
}

export default Board;