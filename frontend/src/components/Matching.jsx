import {withCookies} from "react-cookie";
import {Button, Link} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiURL} from "../App";

const Matching = (props) => {
    const [favoriteList, setFavoriteList] = useState([])
    const [approachedMeList, setApproachedMeList] = useState([])
    const [matchingList, setMatchingList] = useState([])
    const [matchingUserProfileList, setMatchingUserProfileList] = useState([])

    useEffect(() => {
        axios.get(`${apiURL}/api/my_favorite/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log("success")
                setFavoriteList(res.data.map(item => item.approached))
            })
            .catch(error => {
                console.log("error")
            })

        axios.get(`${apiURL}/api/approached_me/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log("success")
                setApproachedMeList(res.data.map(item => item.approaching))
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    useEffect(() => {
        setMatchingList(favoriteList.filter(element => approachedMeList.includes(element)))
    }, [approachedMeList]);

    useEffect(() => {
        const queryString = matchingList.map(id => `user_ids=${id}`).join('&');
        const url = `${apiURL}/api/favorite_profile?${queryString}`;

        axios.get(url, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                console.log("success")
                setMatchingUserProfileList(res.data)
            })
            .catch(error => {
                console.error('Error');
            });
        }, [matchingList]);

    return(
        <>
            <h1>マッチングが成立した人</h1>

            <div>
                {matchingUserProfileList.map((profile, index) => (
                    <div key={index}>
                        <p>名前：{profile.last_name} {profile.first_name}</p>
                        <p>年齢：{profile.age}</p>
                        <p>性別：{profile.sex}</p>
                        <p>趣味：{profile.hobby}</p>
                        <Link href={`/dm/${profile.user}`}>
                            <Button>DM</Button>
                        </Link>
                        <hr/>
                    </div>
                ))}
            </div>

            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>
    )
}

export default withCookies(Matching)