import {withCookies} from "react-cookie";
import {Button, Link} from "@mui/material";
import React from "react";

const Matching = () => {
    return(
        <>
            <h1>マッチングが成立した人</h1>

            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>
    )
}

export default withCookies(Matching)