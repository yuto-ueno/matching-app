import { withCookies } from "react-cookie";
import {Button, Link} from "@mui/material";
import React from "react";

const Dm = () => {
    return (
        <>
            <h1>ダイレクトメッセージ</h1>
            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>

    )
}

export default withCookies(Dm)