import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { apiURL } from '../App';
import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material'

const Home = (props) => {
    const [myProfileList, setMyProfileList] = useState([]);

    useEffect(() => {
        axios.get(`${apiURL}/api/profiles`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setMyProfileList(res.data);

            })
            .catch(error => {
                console.error('Error');
            });
        }, [props.cookies]);

    return (
        <div>
            <h1>Home</h1>
            <div>
                {myProfileList.map((profile, index) => (
                    <div key={index}>
                        <p>こんにちは{profile.last_name} {profile.first_name}さん</p>
                    </div>
                ))}
            </div>

            <Link href="/profile/edit">
                <Button>プロフィールの編集</Button>
            </Link>
            <br/>

            <Link href="/select">
                <Button>仲間探し</Button>
            </Link>
            <br/>

            <Link href="/favorite">
                <Button>LIKEした人</Button>
            </Link>
            <br/>

            <Link href="/dm">
                <Button>DM</Button>
            </Link>
            <br/>

            <Link href="/login">
                <Button>ログアウト</Button>
            </Link>
            <br/>

        </div>
    );
}

export default withCookies(Home);
