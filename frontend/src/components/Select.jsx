import { withCookies } from "react-cookie";
import {apiURL} from "../App";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Link} from "@mui/material";


// 自分以外の人のプロフィールを表示
// LIKEを押せるようにする
const Select = (props) => {
    const [otherProfileList, setOtherProfileList] = useState([]);
    const [likedList, setLikedList] = useState([])
    const [approachedList, setApproachedList] = useState([])

    useEffect(() => {
        axios.get(`${apiURL}/api/other_profile`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setOtherProfileList(res.data)
                //console.log("success")

            })
            .catch(error => {
                console.error('Error');
            });
        }, [props.cookies]);

    const handleLike = (profile) => {
        axios.post(`${apiURL}/api/my_favorite/`, {"approached":profile.user}, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log("success")
                axios.get(`${apiURL}/api/my_favorite/`, {
                    headers:{
                        'Authorization': `JWT ${props.cookies.get('token')}`
                    }
                })
                    .then(res => {
                        // console.log(res.data)
                        setLikedList(res.data)
                        setApproachedList(res.data.map(item => item.approached))

                    })
                    .catch(error => {
                        console.log("error")
                    })
            })
            .catch(error => {
                console.log("error")
            })
    }

    // アプローチしているユーザーを取得
    useEffect(() => {
        axios.get(`${apiURL}/api/my_favorite/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                // console.log(res.data)
                setLikedList(res.data)
                setApproachedList(res.data.map(item => item.approached))

            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    const handleDelete = (profile) => {
        axios.delete(`${apiURL}/api/delete_favorite?approached=${profile.user}`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log("success")
                axios.get(`${apiURL}/api/my_favorite/`, {
                    headers:{
                        'Authorization': `JWT ${props.cookies.get('token')}`
                    }
                })
                    .then(res => {
                        // console.log(res.data)
                        setLikedList(res.data)
                        setApproachedList(res.data.map(item => item.approached))

                    })
                    .catch(error => {
                        console.log("error")
                    })
            })
            .catch(error => {
                console.log("error")
            })
    };

    return (
        <>
            <h1>気になる人にLIKEボタンを押そう！</h1>
            <div>
                {otherProfileList.map((profile, index) => (
                    <div key={index}>
                        <p>名前：{profile.last_name} {profile.first_name}</p>
                        <p>年齢：{profile.age}</p>
                        <p>性別：{profile.sex}</p>
                        <p>趣味：{profile.hobby}</p>

                        {approachedList.includes(profile.user) ? (
                            <div>
                                <p>LIKEボタンを押したよ</p>
                                <Button
                                onClick={() => handleDelete(profile)}
                                >
                                    LIKEを取り消す
                                </Button>
                            </div>
                        ) : (
                            <Button
                            variant="contained"
                            onClick={() => handleLike(profile)}
                            >
                            LIKE
                            </Button>
                        )}
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

export default withCookies(Select)