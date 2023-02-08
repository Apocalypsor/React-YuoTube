import React from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {getUser} from "../../tool";
import {getLike, postLike, postUnlike} from "../../api/like";

const styles = {
    icons: {
        strokeWidth: 1,
        stroke: "#ffffff",
        transform: "scale(1.5)",
        marginLeft: "5px",
        marginRight: "5px",
    }
};

function LikeButton({videoId, size = "large"}) {
    const [userId, setUserId] = React.useState(null);
    const [liked, setLiked] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getUser();
            if (res) {
                setUserId(res.email);
            }

            const like = await getLike(res.email, videoId);
            setLiked(like);
        }

        fetchData();
    }, []);

    function handleClick() {
        async function postData() {
            if (!liked.found) {
                setLiked({found: true});
                const res = await postLike(userId, videoId);
                setLiked(res);
            } else {
                setLiked({found: false});
                await postUnlike(liked.id);
            }

        }

        postData();
    }

    if (!userId) return null;

    // TODO: show the number of likes
    return liked.found ? (
        <ThumbUpAltIcon fontSize={size} sx={{...styles.icons, color: "red"}} onClick={handleClick}/>) : (
        <ThumbUpOutlinedIcon fontSize={size} sx={{...styles.icons, color: "gray"}} onClick={handleClick}/>);

}

export default LikeButton;