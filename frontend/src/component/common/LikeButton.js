import React from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const styles = {
    icons: {
        strokeWidth: 1,
        stroke: "#ffffff",
        transform: "scale(1.5)",
        marginLeft: "5px",
        marginRight: "5px",
    }
};

function LikeButton({userId, videoId, size = "large"}) {
    const [liked, setLiked] = React.useState(false);
    const [clickLike, setClickLike] = React.useState(false);

    function handleClick() {
        setClickLike(true);
    }


    return liked ? (<ThumbUpAltIcon fontSize={size} sx={{...styles.icons, color: "red"}} onClick={handleClick}/>) : (
        <ThumbUpOutlinedIcon fontSize={size} sx={{...styles.icons, color: "gray"}} onClick={handleClick}/>);

}

export default LikeButton;