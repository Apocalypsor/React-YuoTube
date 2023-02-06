import React from "react";
import {Avatar, Card, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import theme from "../../theme";
import Link from '@mui/material/Link';

const style = {
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

const VideoCard = ({title, channel, views, image}) => {
    return (
        <Card sx={style.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="channel">
                        {channel[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <SettingsIcon/>
                    </IconButton>
                }
                title={title}
                subheader={`${views} views`}
            />
            <Link href="#">
                <CardMedia
                    sx={style.cardMedia}
                    image={image}
                    title={title}
                />
            </Link>
            <CardContent sx={style.cardContent}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {channel}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default VideoCard;