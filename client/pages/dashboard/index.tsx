import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import DropCard from "../../components/drop/dropCard";
import { DataType, DropType } from "../../types/types";


const Dashboard: NextPage<{data: DataType}> = ({data}) => {

    const [dropsState, setDropsState] = useState<DropType[]>(data.drops);

    const getData = async () => {
        const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop`, { withCredentials: true });
        console.log(val.data);
        setDropsState(val.data.drops);
    }

    //getData();
    console.log(dropsState);


    return (
        <div className="">
            <h1>Dashboard</h1>

            <div className="">
                {dropsState.map((drop) => (
                    <div className="" key={drop._id}>
                        <DropCard drop={drop} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { req } = context;

    const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop`, {
        headers: {
            cookie: req.headers.cookie
        },
        withCredentials: true
    });

    return {
        props: {
            data: val.data
        }
    }
}