import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import DropPage from "../../components/drop/dropPage";
import Sidebar from "../../components/drop/sidebar";
import { DropType } from "../../types/types";

const Drop: NextPage<{data: DropType}> = ({data}) => {

    const [drop, setDrop] = useState(data);
    
    return (
        <div className="">

            <div className="flex">
                <DropPage drop={drop} />

                <Sidebar />
            </div>
        </div>
    )
}

export default Drop

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { req, query } = context;

    const val = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/drop/${query.id}`, {
        headers: {
            cookie: req.headers.cookie
        },
        withCredentials: true
    });

    return {
        props: {
            data: val.data.drop
        }
    }
}