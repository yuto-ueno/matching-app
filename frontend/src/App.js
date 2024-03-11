import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateUser  from './components/CreateUser';
import Login  from './components/Login';
import Home  from './components/Home';
import { CookiesProvider, withCookies} from 'react-cookie';
import Header from "./components/Header";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import Select from "./components/Select";
import Favorite from "./components/Favorite";
import Dm from "./components/Dm";
import Matching from "./components/Matching";


export const apiURL = 'http://127.0.0.1:8000';

const App = () => {
    return(
        <>
            <Router>
                <CookiesProvider>
                    <Routes>
                        <Route path="/" element={<CreateUser />} />
                        <Route path="profile/create" element={<CreateProfile />} />
                        <Route path="profile/edit" element={<EditProfile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="home" element={<Home />} />
                        <Route path="select" element={<Select />} />
                        <Route path="favorite" element={<Favorite />} />
                        <Route path="matching" element={<Matching />} />
                        <Route path="dm" element={<Dm />} />
                    </Routes>
                </CookiesProvider>
            </Router>
        </>
    )
}

export default withCookies(App)