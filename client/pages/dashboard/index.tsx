import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import DropCard from "../../components/drop/dropCard";
import { DataType, DropType } from "../../types/types";
import jwt_decode from "jwt-decode";
import SearchBar from "../../components/search";
import CreateDrop from "../../components/form/createDrop";
import NavBar from "../../components/navbar";
import { BsPlus } from "react-icons/bs";

const Dashboard: NextPage<{ data: DataType, token: string }> = ({data, token}) => {

    const [dropsState, setDropsState] = useState<DropType[]>(data.drops);
    const [isOpen, setIsOpen] = useState(false);

    const [tags, setTags] = useState(['Javascript', 'Open Source', 'Kubernetes', 'CNCF', 'Golang', 'Database', 'Cloud Computing', 'Linux', 'AWS', 'Docker', 'Typescript', 'Python', 'Rust', 'Microservices', 'React', 'Server', 'Miscellaneous']);

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
        <div className="px-6 bg-[#131517] min-h-screen">
            <div className="border-b border-gray-100 border-opacity-40">
                <NavBar />
            </div>

            <div className="my-4 flex">
                <SearchBar drops={data.drops} setDrops={setDropsState} />
            </div>

            <div className="flex mt-8">
                {tags.map((tag, index) => (
                    <div className="mr-4" key={index}>
                        <button className={`px-4 py-1 font-medium rounded-lg hover:bg-[#24282E] ${selectedTag == tag ? "bg-[#24282E] text-white" : "bg-[#131517] text-[#A0A6B1]"}`} onClick={() => handleTag(tag)}>{tag}</button>
                    </div>
                ))}
            </div>

            <div className="my-6 flex justify-between">
                <div className="text-2xl font-semibold text-white">All resources</div>
                <button className="flex bg-[#3F8DFD] rounded-md pl-3 pr-5 py-1 font-medium text-white" onClick={() => setIsOpen(!isOpen)}>
                    <div className="self-center mr-1.5 text-2xl"><BsPlus /></div>
                    Create Drop
                </button>
                {isOpen && <CreateDrop isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>

            <div className="grid grid-cols-4 gap-4 gap-x-8">
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