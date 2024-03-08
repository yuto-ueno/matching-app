import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { apiURL } from '../App';
import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material'

const Home = (props) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`${apiURL}/api/profiles`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setList(res.data);

            })
            .catch(error => {
                // console.error('Error');
            });
        }, [props.cookies]);

    return (
        <div>
            <h1>Profiles</h1>
            <div>
                {list.map((profile, index)=>(
                    <div key={index}>
                        <p>age: {profile.age}</p>
                        <p>university: {profile.university}</p>
                    </div>
                ))}
            </div>
            <button>外出ボタン</button>
            <div>散歩中です</div>
            <div>友達と遭遇しました</div>
            <button>メッセージ画面</button>
            <div>今日は誰とも会いませんでした</div>
        </div>
);
}

export default withCookies(Home);
