import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./page/Home";
import Navbar from "./component/common/NavBar";
import Video from "./page/Video";

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
            <Navbar/>
            <Router/>
        </div>
    );
}

export default App;
