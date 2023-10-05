import React, { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, gameOverLogic } from '../../functions';
import io from 'socket.io-client';
import qs from 'query-string';
import Board from '../../components/Board/Board';
import GameOver from '../../components/GameOver/GameOver';
import { useLocation, useNavigate } from 'react-router-dom';

import Player from '../../components/Player/Player';
import Toast from '../../components/Toast/Toast';
import './Game.css';

// FEN string notation to get the position of the pieces on the board
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let socket = io('http://localhost:5000', { autoconnect: false });

// checkmate - to check for checkmate
// const FEN = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3';

const Game = () => {
    const [fen, setFen] = useState(FEN);
    const { current: chess } = useRef(new Chess(fen));
    const [board, setBoard] = useState(createBoard(fen));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const gameId = useRef();
    const playerName = useRef();
    const { gameOver, playerName: player, opponentName, playerColor, message } = useSelector(state => state.gameReducer);
    const [oppColor, setOppColor] = useState('');
    const [youColor, setYouColor] = useState('');



    useEffect(() => {
        setBoard(createBoard(fen));
    }, [fen]);



    // get Info
    useEffect(() => {
        const { id, name } = qs.parse(location.search);
        playerName.current = name;
        gameId.current = id;
    }, [location.search]);

    // socket events
    // setting all infos
    useEffect(() => {
        socket.emit('join', { name: playerName.current, gameId: gameId.current }, ({ error, color }) => {
            if (error) {
                navigate('/', { replace: true });
            }
            dispatch({ type: 'SET_PLAYER', name: playerName.current });
            dispatch({ type: 'SET_PLAYER_COLOR', color: color });
            setYouColor(color);
        });
        socket.on('welcome', ({ message, opponent }) => {
            dispatch({ type: 'SET_MESSAGE', message });
            dispatch({ type: 'SET_OPPONENT', name: opponent?.name });
            setOppColor(opponent?.color);
        });
        socket.on('opponentJoin', ({ message, opponent }) => {
            dispatch({ type: 'SET_MESSAGE', message });
            dispatch({ type: 'SET_OPPONENT', name: opponent.name });
        });

        socket.on('opponentMove', ({ from, to }) => {
            chess.move({ from, to });
            setFen(chess.fen());
            dispatch({ type: 'SET_MESSAGE', message: 'Your Turn' });
            dispatch({ type: 'SET_OPPONENT_MOVES', moves: [from, to] });
        });
        socket.on('message', ({ message }) => {
            dispatch({ type: 'SET_MESSAGE', message });
        });
    }, [chess, navigate, dispatch]);

    useEffect(() => {
        const [gameOver, status] = gameOverLogic(chess);
        if (gameOver) {
            dispatch({ type: 'GAME_OVER', status, player: chess.turn() });
            return;
        }
        dispatch({ type: 'SET_TURN', player: chess.turn(), check: chess.inCheck() });
    }, [fen, chess, dispatch]);

    // store original position of cell before it is dragged and dropped
    const fromPos = useRef();

    // takes cell we move as parameter
    const makeAMove = (pos) => {
        const from = fromPos.current;
        const to = pos;

        try {
            if (youColor === chess.turn()) {
                const move = chess.move({ from, to });
                if (move) {
                    // Only allow the move if it's the player's turn
                    dispatch({ type: 'CLEAR_POSSIBLE_MOVES' });
                    setFen(chess.fen());
                    socket.emit('move', { gameId: gameId.current, from, to: pos });
                } else {
                    return dispatch({ type: 'SET_MESSAGE', message: 'Invalid Move' });
                }
            } else {
                return dispatch({ type: 'SET_MESSAGE', message: 'It\'s not your turn' });
            }
        } catch (error) {
            return dispatch({ type: 'SET_MESSAGE', message: 'Invalid Move' });
        }
    }

    // update to new from pos
    const setFromPos = (pos) => {
        if (youColor === chess.turn()) {
            fromPos.current = pos;
            dispatch({ type: 'SET_POSSIBLE_MOVES', moves: chess.moves({ square: pos }) });
        } else {
            dispatch({ type: 'SET_MESSAGE', message: 'It\'s not your turn' });
        }
    };



    if (gameOver) {
        return <GameOver />;
    }

    return (
        <div className='game'>
            <Board cells={board} makeAMove={makeAMove} setFromPos={setFromPos} />
            <Player name={player} color={playerColor} player />
            <Player name={opponentName} color={playerColor === 'w' ? 'b' : 'w'} />
            <Toast />
        </div>
    );
}

export default Game;