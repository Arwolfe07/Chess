import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import playAgain from '../../assets/play-again.jpg';
import gameOver from '../../assets/game-over.jpg';
import Layout from '../Layout';
import './GameOver.css';

const GameOver = () => {
    const { status, turn } = useSelector(state => state.gameReducer);
    const navigate = useNavigate();
    let winner;
    if (status === 'checkmate') {
        if (turn === 'b') {
            winner = 'white';
        } else {
            winner = 'black';
        }
    }

    const playAgainHandler = () => {
        navigate('/', { replace: true });
    }

    const Content = () => (
        <div className='gameover-container'>
            <h1>Game Over</h1>
            <p>
                The Game ended in a <mark>{status}</mark>
            </p>
            {winner && (
                <p><mark>{winner}</mark> won</p>
            )}
            <img src={playAgain} alt='play-again' className='play-again-img' />
            <button className='button' onClick={playAgainHandler}>Play Again</button>
        </div>
    );

    const Image = () => (
        <img src={gameOver} alt='game-over' className='game-over-bg' />
    );



    return <Layout Image={Image} Content={Content} />;
}

export default GameOver