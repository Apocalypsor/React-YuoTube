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
            <Button
                variant="contained"
                component="label"
                color={"secondary"}
            >
                Upload
                <input hidden accept="image/*" multiple type="file"/>
            </Button>
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
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
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
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Youtube
                    </Typography>
                    <LoginLogoutButton/>
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}

export default ButtonAppBar;
