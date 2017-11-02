import React from 'react';
import Cell from './Cell';

const styles = {
    column: {

    }
}

class Column extends React.Component {
    render() {
        return (
            <div style={styles.column}>
                {
                    this.props.cells.map((cell, idx) => {
                        return <Cell key={idx} value={cell} />
                    })
                }
            </div>
        )
    }
}

export default Column;
