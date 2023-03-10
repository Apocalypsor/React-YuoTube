import React from "react";
import {Avatar, Card, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from "@mui/material/Typography";
import {formatTime} from "../../tool";
import LikeButton from "../common/LikeButton";
import {getLikeCount} from "../../api/like";

const style = {
    link: {
        textDecoration: 'none',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
};

const VideoCard = ({id, title, views, likes, image, user, createdAt}) => {
    const [likeCount, setLikes] = React.useState(likes);
    const refreshLikes = async () => {
        const result = await getLikeCount(id);
        setLikes(result);
    }

    return (
        <Card sx={style.card}>
            <CardHeader
                avatar={<Avatar
                    src={user.data.attributes.picture}
                    alt="User avatar"
                    sx={{height: 36, width: 36}}
                />}
                action={
                    <IconButton href={`/video/${id}`}>
                        <OpenInNewIcon/>
                    </IconButton>
                }
                title={<Link href={`/video/${id}`} sx={style.link}>{title}</Link>}
                subheader={formatTime(createdAt)}
            />

            <Link href={`/video/${id}`} sx={style.link}>
                <CardMedia
                    sx={style.cardMedia}
                    image={image}
                    title={title}
                />
            </Link>

            <CardContent sx={style.cardContent}>
                <Typography body1='span' fontSize={'1.2rem'}>
                    {`${views} views ｜ ${likeCount} likes`}
                </Typography>
                <LikeButton size={'medium'} refreshLikes={refreshLikes} videoId={id}/>
            </CardContent>

        </Card>
    );
};

export default VideoCard;