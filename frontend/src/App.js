import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateUser  from './components/CreateUser';
import Login  from './components/Login';
import Home  from './components/Home';
import { CookiesProvider, withCookies} from 'react-cookie';
import Header from "./components/Header";
import CreateProfile from "./components/CreateProfile";

export const apiURL = 'http://127.0.0.1:8000';

const App = () => {
    return(
        <>
            <Router>
                <CookiesProvider>
                    <Routes>
                        <Route path="/" element={<CreateUser />} />
                        <Route path="profile" element={<CreateProfile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="home" element={<Home />} />
                    </Routes>
                </CookiesProvider>
            </Router>
        </>
    )
}

export default withCookies(App)