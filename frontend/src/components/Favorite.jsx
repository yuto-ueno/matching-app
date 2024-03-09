import { withCookies } from "react-cookie";
import {Button, Link} from "@mui/material";
import React from "react";

const Favorite = () => {
    return(
        <>
            <h1>LIKEした人</h1>
            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>
    )
}

export default withCookies(Favorite)