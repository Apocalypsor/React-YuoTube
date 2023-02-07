import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
};

function Loading() {

    return (
        <div style={style}>
            <CircularProgress/>
        </div>
    );
}

export default Loading;
