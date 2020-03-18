import React from 'react';
import Square from "./Square";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isItX: true

        }
    }

    handleSquareOnClick = (i) => {
        if (!this.state.squares[i]) {
            const squares = this.state.squares.slice();
            squares[i] = this.state.isItX ? 'X' : 'O';
            this.setState({
                squares: squares,
                isItX: !this.state.isItX
            });

        }

    };

    fillSquare(i) {
        return (<Square value={this.state.squares[i]} sendToBoard={this.handleSquareOnClick} index={i}/>)
    }

    render() {

        const status = `Next player is ${this.state.isItX ? 'X' : 'O'}`;
        if (calculateWinner(this.state.squares)){
            return `Player ${this.state.isItX ? 'O' : 'X'} is the win! `
        }
        return (<div>
            <div className={"status"}>{status}</div>
            <div className={'board-row'}>
                {this.fillSquare(0)}
                {this.fillSquare(1)}
                {this.fillSquare(2)}
            </div>
            <div className={'board-row'}>
                {this.fillSquare(3)}
                {this.fillSquare(4)}
                {this.fillSquare(5)}
            </div>
            <div className={'board-row'}>
                {this.fillSquare(6)}
                {this.fillSquare(7)}
                {this.fillSquare(8)}
            </div>
        </div>);
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
export default Board;