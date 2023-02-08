import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Avatar, IconButton} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {useAuth0} from '@auth0/auth0-react';
import {clear} from "../../store";
import UploadModal from "./UploadModal";

const style = {
    head: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    navBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    home: {
        width: "20%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loginLogoutButton: {
        width: "20%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    }
}

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();

    return (<Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>);
}

const LogoutButton = () => {
    const {logout, user} = useAuth0();
    const logoutWithRedirect = () => {
        clear();
        logout({logoutParams: {returnTo: window.location.origin}});
    };

    return (
        <>
            <Avatar
                alt={user.name}
                src={user.picture}
                sx={{width: 32, height: 32, mr: 1}}
            />
            <UploadModal/>
            <Button
                color="inherit"
                onClick={logoutWithRedirect}
            >Logout</Button>
        </>
    );
}


const LoginLogoutButton = () => {
    const {isAuthenticated} = useAuth0();

    return isAuthenticated ? (<LogoutButton/>) : (<LoginButton/>);
};

function ButtonAppBar() {
    return (
        <Box sx={style.head}>
            <AppBar position="static">
                <Toolbar sx={style.navBar}>
                    <Box sx={style.home}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            href={"/"}
                        >
                            <HomeIcon/>
                        </IconButton>
                    </Box>

                    <Typography variant="h6" component="div" sx={style.title}>
                        YuoTube
                    </Typography>
                    <Box sx={style.loginLogoutButton}>
                        <LoginLogoutButton/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar;
