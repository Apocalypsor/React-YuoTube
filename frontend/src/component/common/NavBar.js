import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {IconButton} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <Button color="inherit"
                onClick={isAuthenticated ? () => logout({logoutParams: {returnTo: window.location.origin}}) : loginWithRedirect}>
            {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
    );
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
                    <Auth0Provider
                        domain={process.env.REACT_APP_AUTH0_DOMAIN}
                        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                        authorizationParams={{
                            redirect_uri: window.location.origin
                        }}
                        cacheLocation="localstorage"
                    >
                        <LoginButton/>
                    </Auth0Provider>
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}

export default ButtonAppBar;
