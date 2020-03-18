import React from 'react';
import Square from "./Square";

class Board extends React.Component {
    fillSquare(i) {
        return (<Square value={this.props.squares[i]} sendToBoard={this.props.sendToGame} index={i}/>)
    }

    render(){
        return (<div>
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
export default Board;