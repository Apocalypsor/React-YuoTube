import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loading from "../component/common/Loading";
import {getVideoById, postView} from "../api/video";
import {useParams} from "react-router-dom";
import LikeButton from "../component/common/LikeButton";
import {Avatar, Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {getCommentByVideoId, postComment} from "../api/comment";
import {getUser} from "../tool";

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
    titleBox: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: '3rem',
        textAlign: 'left',
    },
    description: {
        fontSize: '1.5rem',
        textAlign: 'left',
    },
    commentCard: {
        textAlign: 'left',
        marginTop: '1%',
        backgroundColor: '#F5F5F5',
        display: 'grid',
        alignItems: 'left',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'auto',
    },
    commentBox: {
        maxHeight: '600px',
        overflow: 'auto',
    },
    comment: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '5px',
        padding: '5px',
    },
    commentUsername: {
        marginLeft: '10px',
        fontWeight: "600",
        fontSize: "1.5rem"
    },
    commentContent: {
        marginLeft: '10px',
        fontSize: "1.5rem"
    },
    commentBarContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "auto minmax(auto, 56px)",
        marginTop: "1%",
        border: "2px solid #BEBEBE",
        borderRadius: "10px",
    },
    commentBarTextField: {
        paddingLeft: "10px",
        "& fieldset": {border: 'none'},
    },
    commentBarButton: {
        width: "48px",
        padding: "unset"
    },
}

const Video = () => {
    const {id} = useParams();
    const viewed = React.useRef(false);

    const [user, setUser] = React.useState();
    const [video, setVideo] = React.useState();

    const [content, setContent] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const [commentBoxId, setCommentBoxId] = React.useState(0);


    React.useEffect(() => {
        const fetchData = async () => {
            const user = await getUser();
            setUser(user);

            const result = await getVideoById(id);
            setVideo(result);

            const comments = await getCommentByVideoId(id);
            setComments(comments);

            if (!viewed.current) {
                viewed.current = true;
                const views = await postView(id);
                console.log(views);
            }

        }

        fetchData();
    }, [id]);

    const postNewComment = async () => {
        const postData = async () => {
            const res = await postComment(id, user.email, content);
            const comments = await getCommentByVideoId(id);
            setComments(comments);
            setCommentBoxId(res.data.id);
        }

        postData().then(() => {
            setContent("");
        });
    }

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
                        {video.attributes.title} <LikeButton videoId={id}/>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={style.description}>
                        {video.attributes.description}
                    </Typography>

                    <Divider/>

                    {user && <Card sx={style.commentCard}>
                        <CardContent>
                            <Typography variant={"h4"}>Comments</Typography>
                            <Box key={commentBoxId} sx={style.commentBox}>
                                {comments.map(comment => (
                                    <Box key={comment.attributes.id} sx={style.comment}>
                                        <Avatar
                                            alt={comment.attributes.user.data.attributes.nickname}
                                            src={comment.attributes.user.data.attributes.picture}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            sx={style.commentUsername}
                                        >
                                            {comment.attributes.user.data.attributes.nickname} {" "}
                                        </Typography>
                                        <Typography component="span" sx={style.commentContent}>
                                            {comment.attributes.content}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={style.commentBarContainer}>
                                <TextField
                                    fullWidth
                                    value={content}
                                    placeholder="Add a comment..."
                                    multiline
                                    rows={1}
                                    id="commentText"
                                    onChange={(e) => {
                                        setContent(e.target.value)
                                    }}
                                    sx={style.commentBarTextField}
                                />
                                <Button
                                    color="primary"
                                    sx={style.commentBarButton}
                                    disabled={!content.trim()}
                                    onClick={postNewComment}
                                >
                                    Post
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>}
                </CardContent>
            </Card>
        </div>
    );
}

export default Video;