import { withCookies } from 'react-cookie';
import {
    Box,
    Button,
    Container,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {apiURL} from "../App";
import axios from "axios";

const EditProfile = (props) => {
    // Profileの情報を格納
    const [user, setUser] = useState("");
    const [last_name, setLast_name] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [hobby, setHobby] = useState("");
    const [elementary_school, setElementary_school] = useState("");
    const [middle_school, setMiddle_school] = useState("");
    const [high_school, setHigh_school] = useState("");
    const [university, setUniversity] = useState("");

    const getProfile = () => {
        axios.get(`${apiURL}/api/profile`, {
                    headers: {
                        'Authorization': `JWT ${props.cookies.get('token')}`
                    }
                })
                    .then(res => {
                        setUser(res.data[0].user)
                        setLast_name(res.data[0].last_name)
                        setFirst_name(res.data[0].first_name)
                        setAge(res.data[0].age)
                        setSex(res.data[0].sex)
                        setHobby(res.data[0].hobby)
                        setElementary_school((res.data[0].elementary_school))
                        setMiddle_school((res.data[0].middle_school))
                        setHigh_school((res.data[0].high_school))
                        setUniversity((res.data[0].university))
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.error(error);
                    });
    }

    useEffect(() => {
        getProfile()
    }, []);

    const handleEdit = (event) => {
        event.preventDefault();
        const form_data = new FormData();

        form_data.append("is_kyc", true);
        form_data.append("last_name", last_name);
        form_data.append("first_name", first_name);
        form_data.append("age", age);
        form_data.append("sex", sex);
        form_data.append("hobby", hobby);
        form_data.append("elementary_school", elementary_school);
        form_data.append("middle_school", middle_school);
        form_data.append("high_school", high_school);
        form_data.append("university", university);

        axios.patch(`${apiURL}/api/users/edit_profile/${user}`, form_data, {
            headers: {
                Authorization: `JWT ${props.cookies.get("token")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                window.location.href = "/home";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <Container maxWidth="md">
            <Box sx={{my:4}} component="h1">
                    プロフィール編集
            </Box>
            <Paper sx={{p:10}}>
                <Box component="form" sx={{mt:1}} onSubmit={handleEdit}>
                    <Grid>
                        <TextField
                            margin="normal"
                            label="姓"
                            id="last_name"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="名前"
                            id="first_name"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="年齢"
                            id="age"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <InputLabel id="sex-label">性別</InputLabel>
                    <Select
                        labelId="sex-label"
                        id="sex"
                        name="sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        label="性別"
                    >
                        <MenuItem value="male">男性</MenuItem>
                        <MenuItem value="female">女性</MenuItem>
                    </Select>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="趣味"
                            id="hobby"
                            name="hobby"
                            value={hobby}
                            onChange={(e) => setHobby(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="小学校"
                            id="elementary_school"
                            name="elementary_school"
                            value={elementary_school}
                            onChange={(e) => setElementary_school(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="中学校"
                            id="middle_school"
                            name="middle_school"
                            value={middle_school}
                            onChange={(e) => setMiddle_school(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="高校"
                            id="high_school"
                            name="high_school"
                            value={high_school}
                            onChange={(e) => setHigh_school(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            margin="normal"
                            label="大学"
                            id="university"
                            name="university"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt:3, mb:2}}
                    >
                        変更
                    </Button>

                    <Button variant="text" href="/home" sx={{ mt: 1 }}>
                        ホームに戻る
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default withCookies(EditProfile)