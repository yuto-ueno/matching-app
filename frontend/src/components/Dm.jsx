import { withCookies } from "react-cookie";
import {Button, Link} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiURL} from "../App";
import axios from "axios";

const Dm = (props) => {
    const { userId } = useParams();
    const [friendName, setFriendName] = useState("")

    useEffect(() => {
        axios.get(`${apiURL}/api/favorite_profile?user_ids=${userId}`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log(res.data[0].last_name)
                setFriendName(res.data[0].last_name)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <>
            <h1>{friendName}さんとのメッセージ</h1>

            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>

    )
}

export default withCookies(Dm)