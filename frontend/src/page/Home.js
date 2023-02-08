import React from 'react';
import {Grid} from "@mui/material";
import VideoCard from "../component/home/VideoCard";
import {getVideos} from "../api/video";
import Loading from "../component/common/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

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
    const [hasMore, setHasMore] = React.useState(true);
    const init = React.useRef(true);
    const page = React.useRef(0);

    const fetchData = async () => {
        page.current += 1;
        const res = await getVideos(page.current);
        if (res.length === 0) {
            setHasMore(false);
            return;
        }
        setVideos([...videos, ...res]);
        setIsLoading(false);
        console.log("videos", res);
    }

    React.useEffect(() => {
        if (init.current) {
            fetchData();
            init.current = false;
        }
    }, []);

    return isLoading ? (<Loading/>) : (
        <div style={style.root}>
            <InfiniteScroll
                dataLength={videos.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Grid container spacing={4} sx={{overflow: 'none'}}>
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
            </InfiniteScroll>

        </div>
    );
};

export default Home;
