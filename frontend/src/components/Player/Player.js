import React from 'react';
import './Player.css';

const Player = ({ name, color, player }) => {
    const white = color === 'w';
    const image = white ? 'wK' : 'bK';
    return (
        <div className={`player ${player ? 'you' : 'opponent'}`}>
            <p className='player-name'>{name}</p>
            <img src={require(`../../assets/pieces/${image}.png`)} alt='pic' />
        </div>
    )
}

export default Player;