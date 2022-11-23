import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import DropCard from "../../components/drop/dropCard";
import { DataType, DropType } from "../../types/types";
import jwt_decode from "jwt-decode";
import SearchBar from "../../components/search";
import CreateDrop from "../../components/form/createDrop";
import NavBar from "../../components/navbar";

const Dashboard: NextPage<{ data: DataType, token: string }> = ({data, token}) => {

    const [dropsState, setDropsState] = useState<DropType[]>(data.drops);
    const [isOpen, setIsOpen] = useState(false);

    const [tags, setTags] = useState(['sports', 'technology', 'songs']);

    const [selectedTag, setSelectedTag] = useState('');

    const filterDrop = (tag: string) => {
        if (tag === '') {
            setDropsState(data.drops);
        } else {
            setDropsState(data.drops.filter(drop => drop.tags.includes(tag)));
        }
    }

    const handleTag = (tag: string) => {
        if(selectedTag !== tag) {
            setSelectedTag(tag);
        } else {
            setSelectedTag('');
        }
    }

    useEffect(() => {
        filterDrop(selectedTag);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTag]);


    return (
        <div className="px-6">
            <NavBar />

            <div className="my-4 flex">
                <SearchBar />
            </div>

            <div className="flex mt-8">
                {tags.map((tag, index) => (
                    <div className="mr-4" key={index}>
                        <button className={`px-4 py-1 font-medium rounded-lg ${selectedTag == tag ? "bg-black text-white" : "bg-gray-300 text-neutral-600"}`} onClick={() => handleTag(tag)}>{tag}</button>
                    </div>
                ))}
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