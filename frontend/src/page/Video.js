import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from "../component/common/Loading";
import {getVideoById} from "../api/video";
import {useParams} from "react-router-dom";

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
        fontSize: '3rem',
        textAlign: 'left',
    },
    description: {
        fontSize: '1.5rem',
        textAlign: 'left',
    }
}

const Video = () => {
    const [video, setVideo] = React.useState();
    let {id} = useParams();

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getVideoById(id);
            setVideo(result);
        }

        fetchData();
    }, [id]);

    return !video ? (<Loading/>) : (
        <div style={style.container}>
            <Card sx={style.root}>
                <CardContent>
                    <video
                        style={style.video}
                        src={video.attributes.url}
                        controls
                    />
                    <Typography gutterBottom component="div" sx={style.title}>
                        {video.attributes.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={style.description}>
                        {video.attributes.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Video;