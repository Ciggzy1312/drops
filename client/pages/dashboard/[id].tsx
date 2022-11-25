import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import DropPage from "../../components/drop/dropPage";
import Sidebar from "../../components/drop/sidebar";
import { DropType } from "../../types/types";
import jwt_decode from "jwt-decode";

const Drop: NextPage<{data: DropType, token: string}> = ({data, token}) => {

    const [drop, setDrop] = useState(data);
    
    return (
        <div className="">

            <div className="flex">
                <DropPage drop={drop} token={token} />

                <Sidebar drop={drop} />
            </div>
        </div>
    )
}

export default Drop

export const getServerSideProps: GetServerSideProps = async (context) => {

    interface myToken {
        id: string;
        username: string;
        email: string;
    }

    const { req, query } = context;

    let decoded: string | undefined;
    if(req.cookies.token) {
        const { id } = jwt_decode<myToken>(req.cookies.token);
        decoded = id;
    }

    const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop/${query.id}`, {
        headers: {
            cookie: req.headers.cookie
        },
        withCredentials: true
    });

    const dropByTags = await axios.post(`${process.env.NEXT_PUBLIC_URL}api/sidebar/${query._id}`, {
        tag: val.data.drop.tags[Math.floor(Math.random() * val.data.drop.tags.length)]
    }, {
        headers: {
            cookie: req.headers.cookie
        },
        withCredentials: true
    });

    return {
        props: {
            data: val.data.drop,
            token: decoded ? decoded : "Invalid"
        }
    }
}
