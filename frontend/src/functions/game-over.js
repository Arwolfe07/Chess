// Game over in chess has five different types: 
// 1. Checkmate - king is under attack and cannot move to escape it, or the player can't make any move
// 2. Stalemate - when not in check but cannot make any legal move
// 3. Threefold repetition - can claim draw when same position occurs three times on their behalf
// 4. Insufficient pieces - no way to end in checkmate eg. k vs K
// 5. Draw - 2,3,4 has draw state

// below function checks for all states and returns array containing boolean value and state
export const gameOverLogic = (chess) => {
    if (!chess.isGameOver()) {
        return [false, ''];
    }
    if (chess.isCheckmate()) {
        return [true, 'checkmate'];
    }
    if (chess.isStalemate()) {
        return [true, 'stalemate'];
    }
    if (chess.isThreefoldRepetition()) {
        return [true, 'three fold repetition'];
    }
    if (chess.isDraw()) {
        return [true, 'draw'];
    }
};