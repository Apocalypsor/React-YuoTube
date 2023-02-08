import React from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {getUser} from "../../tool";

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
    const [liked, setLiked] = React.useState(false);
    const [clickLike, setClickLike] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getUser();
            if (res) {
                setUserId(res.email);
            }
        }

        fetchData();
    }, []);

    function handleClick() {
        setClickLike(true);
    }

    if (!userId) return null;

    return liked ? (<ThumbUpAltIcon fontSize={size} sx={{...styles.icons, color: "red"}} onClick={handleClick}/>) : (
        <ThumbUpOutlinedIcon fontSize={size} sx={{...styles.icons, color: "gray"}} onClick={handleClick}/>);

}

export default LikeButton;