import { withCookies } from "react-cookie";
import {apiURL} from "../App";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Link} from "@mui/material";


// 自分以外の人のプロフィールを表示
// LIKEを押せるようにする
const Select = (props) => {
    const getOthersUrl = `${apiURL}/api/others`

    const [otherProfileList, setOtherProfileList] = useState([]);

    useEffect(() => {
        axios.get(getOthersUrl, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setOtherProfileList(res.data)
                console.log("success")

            })
            .catch(error => {
                console.error('Error');
            });
        }, [props.cookies]);

    const handleLike = () => {
        console.log("a")
    }

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
                        <Button
                            variant="contained"
                            onClick={() => handleLike()}
                        >
                            LIKE
                        </Button>
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