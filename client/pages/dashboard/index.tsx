import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import DropCard from "../../components/drop/dropCard";
import { DataType, DropType } from "../../types/types";
import jwt_decode from "jwt-decode";
import SearchBar from "../../components/search";
import CreateDrop from "../../components/form/createDrop";

const Dashboard: NextPage<{ data: DataType, token: string }> = ({data, token}) => {

    const [dropsState, setDropsState] = useState<DropType[]>(data.drops);
    const [isOpen, setIsOpen] = useState(false);

    const getData = async () => {
        const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop`, { withCredentials: true });
        console.log(val.data);
        setDropsState(val.data.drops);
    }

    //getData();


    return (
        <div className="px-6">
            <h1>Dashboard</h1>

            <div className="my-4 flex">
                <SearchBar />
            </div>

            <div className="my-4 flex justify-between">
                <div className="text-2xl font-semibold">All resources</div>
                <button className="bg-indigo-500 rounded-md px-5 py-1 font-medium text-white" onClick={() => setIsOpen(!isOpen)}>Create Drop</button>
                {isOpen && <CreateDrop isOpen={isOpen} setIsOpen={setIsOpen} />}
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