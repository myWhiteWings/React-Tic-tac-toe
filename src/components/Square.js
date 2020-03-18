import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.sendToBoard(this.props.index)} className="square">
                {this.props.value}
            </button>
        );
    }
}

export default Square;