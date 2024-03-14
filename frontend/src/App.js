import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp  from './components/SignUp';
import Login  from './components/Login';
import Home  from './components/Home';
import { CookiesProvider, withCookies} from 'react-cookie';
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import Choice from "./components/Choice";
import Favorite from "./components/Favorite";
import DirectMessage from "./components/DirectMessage";
import Matching from "./components/Matching";


export const apiURL = 'http://127.0.0.1:8000';

const App = () => {
    return(
        <>
            <Router>
                <CookiesProvider>
                    <Routes>
                        <Route path="/" element={<SignUp />} />
                        <Route path="profile/create" element={<CreateProfile />} />
                        <Route path="profile/edit" element={<EditProfile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="home" element={<Home />} />
                        <Route path="choice" element={<Choice />} />
                        <Route path="favorite" element={<Favorite />} />
                        <Route path="matching" element={<Matching />} />
                        <Route path="dm/:userId" element={<DirectMessage />} />
                    </Routes>
                </CookiesProvider>
            </Router>
        </>
    )
}

export default withCookies(App)