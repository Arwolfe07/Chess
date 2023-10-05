import React from 'react';
import "./Board.css";
import Cell from '../Cell/Cell';

const Board = ({ cells, makeAMove, setFromPos }) => {
    return (
        <div className='board'>
            {cells.map((cell, index) => (
                <Cell key={cell.pos} cell={cell} index={index} makeAMove={makeAMove} setFromPos={setFromPos}/>
            ))}
        </div>
    )
}

export default Board