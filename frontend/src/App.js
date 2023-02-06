import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./page/Home";
import Navbar from "./component/common/NavBar";
import Video from "./page/Video";
import {Auth0Provider} from "@auth0/auth0-react";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/video" element={<Video/>}/>
            </Routes>
        </BrowserRouter>
    )
}

function App() {
    return (
        <div className="App">
            <Auth0Provider
                domain={process.env.REACT_APP_AUTH0_DOMAIN}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
                cacheLocation="localstorage"
            >
                <Navbar/>
                <Router/>
            </Auth0Provider>
        </div>
    );
}

export default App;
