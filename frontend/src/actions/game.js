import * as api from '../api';

export const saveGame = (gameData) => async (dispatch) => {
    try {
        const { data } = await api.saveGame(gameData);
        dispatch({ type: 'FETCH_PREVIOUS_GAMES', prevGames: data });
        dispatch(fetchGames(gameData.userId));
    } catch (error) {
        console.log(error);
    }
}

export const fetchGames = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchGames(userId);
        dispatch({ type: 'FETCH_PREVIOUS_GAMES', prevGames: data });
    } catch (error) {
        console.log(error);
    }
}