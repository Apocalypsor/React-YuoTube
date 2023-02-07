import React from 'react';
import {Grid} from "@mui/material";
import VideoCard from "../component/home/VideoCard";
import {getVideos} from "../api/video";
import Loading from "../component/common/Loading";

const style = {
    root: {
        marginTop: '1%',
        marginLeft: '1%',
        marginRight: '1%',
        flexGrow: 1,
    },
};


const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getVideos();
            setVideos(res);
            setIsLoading(false);
            console.log("videos", res);
        }

        fetchData();
    }, []);

    return isLoading ? (<Loading/>) : (
        <div style={style.root}>
            <Grid container spacing={4}>
                {videos.map((video) => (
                    <Grid item key={video.id} xs={12} sm={6} md={4}>
                        <VideoCard
                            id={video.id}
                            title={video.attributes.title}
                            views={video.attributes.views}
                            image={video.attributes.thumbnail}
                            user={video.attributes.user}
                            createdAt={video.attributes.createdAt}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
