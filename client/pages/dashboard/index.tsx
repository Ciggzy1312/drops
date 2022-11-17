import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import DropCard from "../../components/drop/dropCard";
import { DataType, DropType } from "../../types/types";
import jwt_decode from "jwt-decode";
import SearchBar from "../../components/search";

const Dashboard: NextPage<{ data: DataType, token: string }> = ({data, token}) => {

    const [dropsState, setDropsState] = useState<DropType[]>(data.drops);

    const getData = async () => {
        const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop`, { withCredentials: true });
        console.log(val.data);
        setDropsState(val.data.drops);
    }

    //getData();


    return (
        <div className="px-6">
            <h1>Dashboard</h1>

            <div className="my-4">
                <SearchBar />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {dropsState.map((drop) => (
                    <div className="" key={drop._id}>
                        <DropCard drop={drop} token={token} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (context) => {

    interface myToken {
        id: string;
        username: string;
        email: string;
    }

    const { req } = context;

    let decoded: string | undefined;
    if (req.cookies.token) {
        const { id } = jwt_decode<myToken>(req.cookies.token);
        decoded = id;
    }

    const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop`, {
        headers: {
            cookie: req.headers.cookie
        },
        withCredentials: true
    });

    return {
        props: {
            data: val.data,
            token: decoded ? decoded : "Invalid"
        }
    }
}