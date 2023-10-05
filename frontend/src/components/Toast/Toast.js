import React from 'react';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


const Toast = () => {
    const dispatch = useDispatch();
    const { message } = useSelector(state => state.gameReducer);
    const closeHandler = () =>{
        dispatch({type: 'CLEAR_MESSAGE'});
    }   
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!!message}
            autoHideDuration={2500}

            onClose={closeHandler}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={message}
        />
    )
}

export default Toast;