import React from 'react';
import {Grid} from "@mui/material";
import VideoCard from "../component/home/VideoCard";

const style = {
    root: {
        marginTop: '1%',
        marginLeft: '1%',
        marginRight: '1%',
        flexGrow: 1,
    },
};


const Home = () => {
    return (
        <div style={style.root}>
            <Grid container spacing={4}>
                {[...Array(12)].map((_, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <VideoCard
                            title={`Video Title ${index + 1}`}
                            channel={`Channel ${index + 1}`}
                            views={`${(index + 1) * 1000}`}
                            image={`https://picsum.photos/200/300?random=${index + 1}`}
                            video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
