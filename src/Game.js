import React from 'react';
import Board from "./components/Board";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isItX: true
        }
    }

    handleSquareOnClick = (i) => {
        //make it possible to render chosen quantity of steps
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const currentState = this.state.history[history.length - 1];
        //line 22 + 29 save the history of all board states
        let copiedSquares = currentState.squares.slice();
        //if game was already finished or square was already marked => no sense to continue
        if (calculateWinner(copiedSquares) || copiedSquares[i]) {
            return;
        }
        //X or O just a letter that we put into square. everything depends on  isItX in the state
        copiedSquares[i] = this.state.isItX ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: copiedSquares
            }]),
            isItX: !this.state.isItX,
            stepNumber: history.length
        })

    };

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            //with this definition of isItX it is possible to roll back right value of isItX
            isItX: (move % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const currentState = history[this.state.stepNumber];
        const isWinner = calculateWinner(currentState.squares);
        let status;
        if (isWinner) {
            status = `Player ${this.state.isItX ? 'O' : 'X'} win! `
        } else {
            status = `Next player is ${this.state.isItX ? 'X' : 'O'}`;
        }
        const moves = history.map((step, move) => {
            const message = move ? `Go to step #${move}` : `Start a new game`;
            return (<li key={move}>
                <button className={'btn'} onClick={() => this.jumpTo(move)}>{message}</button>
            </li>);
        });

        return (
            <div className={'game'}>

                <div className={'game-board'}>
                    <div className={'gameStatus'}>{status}</div>
                    <Board squares={currentState.squares}
                           sendToGame={this.handleSquareOnClick}/>
                </div>
                <ol className={'gameLog'}>{moves}</ol>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

        //a must be not a null and also be equals to b and c
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
