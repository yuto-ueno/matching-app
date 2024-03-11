import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { apiURL } from '../App';
import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material'

const Home = (props) => {
    const [myProfileList, setMyProfileList] = useState([]);
    const [goOut, setGoOut] = useState(false)

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

    useEffect(() => {
        axios.get(`${apiURL}/api/goout`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setGoOut(res.data[0].go_out);
            })
            .catch(error => {
                console.error('Error');
            });
        }, [props.cookies]);

    const handleGoOut = () => {
        axios
            .patch(`${apiURL}/api/goout/`, {"go_out":false}, {
                headers: {
                    Authorization: `JWT ${props.cookies.get("token")}`,
                },
            })
            .then((response) => {
                console.log("success");
                setGoOut(true);
            })
            .catch((error) => {
                console.error("Error:")
            });
    };

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

            {goOut ? (
                <p>外出中です</p>
            ) : (
                <button>外出ボタン</button>
            )}
            <button onClick={handleGoOut}>外出ボタン</button>
            <br/>

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
