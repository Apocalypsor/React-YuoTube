import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {video} from "../data";

const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        marginTop: '1%',
    },
    root: {
        width: "80%",
    },
    video: {
        width: "100%",
    },
    title: {
        fontSize: '2rem',
        textAlign: 'left',
    },
    description: {
        fontSize: '1rem',
        textAlign: 'left',
    }
}

function Video() {

    return (
        <div style={style.container}>
            <Card sx={style.root}>
                <CardContent>
                    <video
                        style={style.video}
                        src={video.src}
                        controls
                    />
                    <Typography gutterBottom component="div" sx={style.title}>
                        {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={style.description}>
                        {video.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Video;