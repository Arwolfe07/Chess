// a helper function that is used to get the correct value of moves
// i.e. we may get ['Na3'] where N is Knight so we remove N to get 
// correct position
const getPositions = (moves) => {
    return moves.map((move) => {
        const n = move.length;
        return move.substring(n - 2);
    });
};

// STATE: consists of possibleMoves: predicting moves, turn: to check white or black turn, 
// check: if king is in check, gameOver: to check if game is over or not & status: for game
// over status
const initialState = {
    possibleMoves: [],
    turn: 'w',
    check: false,
    gameOver: false,
    status: '',
    playerName: '',
    playerColor: '',
    opponentName: '',
    message: '',
    opponentMoves: [],
    prevGames: [],
};
const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSSIBLE_MOVES':
            return {
                ...state,
                possibleMoves: getPositions(action.moves)
            };
        case 'CLEAR_POSSIBLE_MOVES':
            return {
                ...state,
                possibleMoves: []
            };
        case 'SET_TURN':
            return {
                ...state,
                turn: action.player,
                check: action.check
            };
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true,
                status: action.status,
                turn: action.player
            };
        case 'SET_PLAYER':
            return {
                ...state,
                playerName: action.name
            };
        case 'SET_PLAYER_COLOR':
            return {
                ...state,
                playerColor: action.color
            };
        case 'SET_OPPONENT':
            return {
                ...state,
                opponentName: action.name
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                message: ''
            };
        case 'SET_OPPONENT_MOVES':
            return {
                ...state,
                opponentMoves: action.moves
            };
        case 'CLEAR_OPPONENT_MOVES':
            return {
                ...state,
                opponentMoves: []
            };
        case 'FETCH_PREVIOUS_GAMES':
            return {
                ...state,
                prevGames: action.prevGames
            };
        default:
            return state;
    }
};

export default gameReducer;