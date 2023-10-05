import * as api from "../api";
import { currentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))));

        navigate('/gameSingle');

    } catch (error) {
        if (error?.response.data.code === 'UAE') {
            return dispatch({ type: 'SET_MESSAGE', message: 'Email already registered' })
        }
        console.log(error);
    }

};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/gameSingle');
    } catch (error) {
        console.log(error);
        if (error?.response.data.code === 'UA') {
            return dispatch({ type: 'SET_MESSAGE', message: 'Invalid Credentials' })
        }
        else if (error?.response.data.code === 'UDE') {
            return dispatch({ type: 'SET_MESSAGE', message: 'User does not exist' })
        }
        
    }
};