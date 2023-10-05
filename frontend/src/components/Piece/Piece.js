import React, { useRef } from 'react';
import "./Piece.css";

const Piece = ({ name, pos, setFromPos }) => {
    const element = useRef();
    // check for piece color
    const color = name === name.toUpperCase() ? 'w' : 'b';
    const imageName = color + name.toUpperCase(); // eg. bK, bB, wK, wQ as named in assets
    let image;
    try {
        image = require(`../../assets/pieces/${imageName}.png`);
    }
    catch (e) {
        image = require('../../assets/pieces/empty.png'); // in case of empty cell
    }

    const startDragHandler = () => {
        setFromPos(pos);
        setTimeout(() => {
            element.current.style.display = 'none';
        }, 0);

    };

    const endDragHandler = () => {
        element.current.style.display = 'block';
    };

    return (
        <img src={image}
            alt='pieces'
            draggable={true}
            className='piece'
            onDragStart={startDragHandler}
            onDragEnd={endDragHandler}
            ref={element} />
    )
}

export default Piece;