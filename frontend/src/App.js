import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./page/Home";
import Navbar from "./component/common/NavBar";
import Video from "./page/Video";
import {Auth0Provider} from "@auth0/auth0-react";
import Callback from "./page/Callback";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/video/:id" element={<Video/>}/>
                <Route path="/callback" element={<Callback/>}/>
            </Routes>
        </BrowserRouter>
    )
}

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Auth0Provider
                    domain={process.env.REACT_APP_AUTH0_DOMAIN}
                    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                    authorizationParams={{
                        redirect_uri: window.location.origin + "/callback",
                    }}
                    cacheLocation="localstorage"
                >
                    <Navbar/>
                    <div style={{marginTop: "80px"}}></div>
                    <Router/>
                </Auth0Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
