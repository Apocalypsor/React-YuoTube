import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: '50px',
    },
};

const Loading = () => {
    return (
        <div style={style.root}>
            <CircularProgress/>
        </div>
    );
}

export default Loading;
