import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth  from './components/Auth';
import Home  from './components/Home';
import { CookiesProvider, withCookies} from 'react-cookie';
import Header from "./components/Header";

export const apiURL = 'http://127.0.0.1:8000';

const App = () => {
    return(
        <>
            <Router>
                <Header />
                <CookiesProvider>
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="home" element={<Home />} />
                    </Routes>
                </CookiesProvider>
            </Router>
        </>
    )
}

export default withCookies(App)