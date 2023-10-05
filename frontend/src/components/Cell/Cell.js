import React from 'react';
import { isLightSquare } from '../../functions';
import "./Cell.css";
import Piece from '../Piece/Piece';
import { useSelector } from 'react-redux';

const Cell = ({ cell, index, setFromPos, makeAMove }) => {
    const light = isLightSquare(cell.pos, index);

    const { possibleMoves, turn, check } = useSelector(state => state.gameReducer);
    const isPossibleMove = possibleMoves.includes(cell.pos);
    const color = cell.piece.toUpperCase() === cell.piece ? 'w' : 'b';

    // to check which cell should be highlighted (contains king and is check)
    const inCheck = () => {
        const king = cell.piece.toUpperCase() === 'K';
        return turn === color && king && check;
    }

    const dropHandler = () => {
        makeAMove(cell.pos);
    }
    return (
        <div className={`cell ${light ? 'light' : 'dark'}`} onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
            <div className={`overlay ${isPossibleMove && 'highlight'} ${inCheck() && 'check'}`}>
                <Piece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
            </div>

        </div>
    )
}

export default Cell;