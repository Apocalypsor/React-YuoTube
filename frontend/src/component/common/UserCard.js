import React from "react";
import {Avatar, Card, CardContent, Typography} from "@mui/material";


const useStyle = (avatarSize = 44) => ({
    avatar: {
        width: avatarSize,
        height: avatarSize
    },
    typography: {
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    wrapper: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "min-content auto",
        gridGap: 12,
        alignItems: "center",
    },
    nameWrapper: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "left"
    }
});

function UserCard({user, avatarSize = 44}) {
    const styles = useStyle(avatarSize);

    return (
        <Card sx={{backgroundColor: "#F5F5F5"}}>
            <CardContent>
                <div style={styles.wrapper}>
                    <Avatar
                        src={user.picture}
                        alt="User avatar"
                        sx={{height: avatarSize, width: avatarSize}}
                    />

                    <div style={styles.nameWrapper}>
                        <Typography variant="subtitle2" sx={styles.typography}>
                            {user.nickname}
                        </Typography>

                        <Typography
                            color="textSecondary"
                            variant="body2"
                            sx={styles.typography}
                        >
                            {user.given_name} {user.family_name}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
}

export default UserCard;