import React, { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, gameOverLogic } from '../../functions';
import io from 'socket.io-client';
import Board from '../../components/Board/Board';
import GameOver from '../../components/GameOver/GameOver';
import { currentUser } from '../../actions/currentUser';
import Toast from '../../components/Toast/Toast';
import moment from 'moment';
import './SinglePlayerGame.css';
import { fetchGames, saveGame } from '../../actions/game';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';



// FEN string notation to get the position of the pieces on the board
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let socket = io('http://localhost:5000', { autoconnect: false });
// const FEN = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3';

const SinglePlayerGame = () => {
    const [fen, setFen] = useState(FEN);
    // let { current: chess } = useRef(new Chess(fen));
    const [chess, setChess] = useState(new Chess(fen));
    const [board, setBoard] = useState(createBoard(fen));
    const dispatch = useDispatch();
    const { gameOver } = useSelector(state => state.gameReducer);
    const user = useSelector(state => state.currentUserReducer);
    const [games, setGames] = useState([]);
    const { prevGames } = useSelector(state => state.gameReducer);
    const [isNewGame, setIsNewGame] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    // const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setBoard(createBoard(fen));

    }, [fen]);

    useEffect(() => {
        setGames(prevGames);
    }, [prevGames]);

    useEffect(() => {

        if (user) {
            dispatch(fetchGames(user?.result._id));
        }
    }, [user])

    useEffect(() => {
        const [gameOver, status] = gameOverLogic(chess);
        if (gameOver) {
            dispatch({ type: 'GAME_OVER', status, player: chess.turn() });
            return;
        }
        dispatch({ type: 'SET_TURN', player: chess.turn(), check: chess.inCheck() });
    }, [fen, chess, dispatch]);

    // store original position of cell before it is dragged and dropped

    useEffect(() => {
        if (!localStorage.getItem('Profile')) {
            return navigate('/auth');
        }
    }, [user]);

    const fromPos = useRef();

    // takes cell we move as parameter
    const makeAMove = (pos) => {
        const from = fromPos.current;
        const to = pos;
        // use inbult .move function of Chess to determine location
        try {
            const move = chess.move({ from, to });

        } catch (error) {
            return alert('Invalid Move');
        }

        dispatch({ type: 'CLEAR_POSSIBLE_MOVES' });
        setFen(chess.fen());
    }

    // update to new from pos
    const setFromPos = (pos) => {
        fromPos.current = pos;
        dispatch({ type: 'SET_POSSIBLE_MOVES', moves: chess.moves({ square: pos }) });
    };

    const resetHandler = () => {
        setFen(FEN);
        chess.reset();
        setIsNewGame(false);
    }
    const saveHandler = () => {
        // setGames([]);
        dispatch(saveGame({ userId: user?.result?._id, saveGameState: fen }));
        dispatch(fetchGames(user?.result?._id));
        window.location.reload();
        resetHandler();
    }
    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        dispatch(currentUser(null));
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                saveHandler();
                logoutHandler();
            }
        }
        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch]);

    const selectGameHandler = (game) => {
        setFen(game.savedState);
        chess.load(game.savedState);
    }

    const menuClickHandler = () => {
        setShowMenu(!showMenu);
    }

    if (gameOver) {
        return <GameOver />;
    }
    return (
        <>
            <div className='game'>
                <Board cells={board} makeAMove={makeAMove} setFromPos={setFromPos} />

                <Toast />
            </div>
            <div className={!showMenu?'toggle':'toggle animate_toggle'}
                onClick={menuClickHandler}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={showMenu?'show right':'hide right'}>
                <p>{user?.result.name}</p>
                <hr />
                <div className='buttons'>

                    <button onClick={() => setIsNewGame(!isNewGame)}>{isNewGame ? 'Continue' : 'New Game'}</button>
                    <button className='logout' onClick={logoutHandler}>Logout</button>
                </div>
                {
                    isNewGame &&
                    <div className='buttons'>
                        <button onClick={saveHandler}>Save</button>
                        <button onClick={resetHandler}>Reset</button>
                    </div>
                }
                <div className='prev-game'>
                    <p>Previous Games</p>
                    {games?.map((game, index) => (
                        <div className='prev' onClick={() => selectGameHandler(game)} key={game._id}>
                            <p>Game- {index + 1}</p>
                            <p>{moment(game.savedOn).calendar()}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default SinglePlayerGame;