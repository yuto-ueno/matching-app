import { withCookies } from 'react-cookie';
import {Button, Link} from "@mui/material";
import React, {useEffect, useState} from "react";
import {apiURL} from "../App";
import axios from "axios";

const EditProfile = (props) => {
    const [user, setUser] = useState("");
    const [is_kyc, setIs_kyc] = useState(true);
    const [last_name, setLast_name] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [hobby, setHobby] = useState("");
    const [elementary_school, setElementary_school] = useState("");
    const [middle_school, setMiddle_school] = useState("");
    const [high_school, setHigh_school] = useState("");
    const [university, setUniversity] = useState("");

    useEffect(() => {
        axios.get(`${apiURL}/api/profile`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setUser(res.data[0].user)
                setIs_kyc(res.data[0].is_kyc)
                setLast_name(res.data[0].last_name)
                setFirst_name(res.data[0].first_name)
                setAge(res.data[0].age)
                setSex(res.data[0].sex)
                setHobby(res.data[0].hobby)
                setElementary_school((res.data[0].elementary_school))
                setMiddle_school((res.data[0].middle_school))
                setHigh_school((res.data[0].high_school))
                setUniversity((res.data[0].university))

            })
            .catch(error => {
                console.error('Error');
            });
        }, [props.cookies]);

    const editProfile = (event) => {
        event.preventDefault();
        let form_data = new FormData();

        form_data.append("is_kyc", is_kyc);
        form_data.append("last_name", last_name);
        form_data.append("first_name", first_name);
        form_data.append("age", age);
        form_data.append("sex", sex);
        form_data.append("hobby", hobby);
        form_data.append("elementary_school", elementary_school);
        form_data.append("middle_school", middle_school);
        form_data.append("high_school", high_school);
        form_data.append("university", university);

        const patchUri = `${apiURL}/api/users/profile/${user}`;

        axios
      .patch(patchUri, form_data, {
        headers: {
          Authorization: `JWT ${props.cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log("success");
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(props.cookies);
      });
    }

    return(
        <>
            <h1>プロフィールの編集</h1>
            <form onSubmit={editProfile}>
                <label htmlFor="last_name">姓</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <br/>

                <label htmlFor="first_name">名</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <br/>

                <label htmlFor="age">年齢</label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <br/>

                <label htmlFor="sex">性別</label>
                <select id="sex" name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <br/>

                <label htmlFor="hobby">趣味</label>
                <input
                    type="text"
                    id="hobby"
                    name="hobby"
                    value={hobby}
                    onChange={(e) => setHobby(e.target.value)}
                />
                <br/>

                <label htmlFor="elementary_school">小学校</label>
                <input
                    type="text"
                    id="elementary_school"
                    name="elementary_school"
                    value={elementary_school}
                    onChange={(e) => setElementary_school(e.target.value)}
                />
                <br/>

                <label htmlFor="middle_school">中学校</label>
                <input
                    type="text"
                    id="middle_school"
                    name="middle_school"
                    value={middle_school}
                    onChange={(e) => setMiddle_school(e.target.value)}
                />
                <br/>

                <label htmlFor="high_school">高校</label>
                <input
                    type="text"
                    id="high_school"
                    name="high_school"
                    value={high_school}
                    onChange={(e) => setHigh_school(e.target.value)}
                />
                <br/>

                <label htmlFor="university">大学</label>
                <input
                    type="text"
                    id="university"
                    name="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                />
                <br/>

                <button type="submit">変更</button>
            </form>

            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>
    )
}

export default withCookies(EditProfile)