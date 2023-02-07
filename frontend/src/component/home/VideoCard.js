import React from "react";
import {Avatar, Card, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import theme from "../../theme";
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from "@mui/material/Typography";
import {formatTime} from "../../tool";

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
        flexGrow: 1,
    },
    playIcon: {
        height: 38,
        width: 38,
        position: 'absolute',
        left: 'calc(50% - 19px)',
        top: 'calc(50% - 19px)',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const VideoCard = ({id, title, views, image, user, createdAt}) => {
    return (
        <Card sx={style.card}>
            <CardHeader
                avatar={<Avatar
                    src={user.data.attributes.picture}
                    alt="User avatar"
                    sx={{height: 36, width: 36}}
                />}
                action={
                    <IconButton aria-label="settings">
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

                <CardContent sx={style.cardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${views} views`}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default VideoCard;