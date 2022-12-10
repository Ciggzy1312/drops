import axios from "axios";
import { FC, useEffect, useState } from "react";
import { DropType } from "../../types/types";


const Sidebar: FC<{ drop: DropType }> = ({ drop }) => {

    const [upvotedDrops, setUpvotedDrops] = useState<DropType[]>([]);
    const [dropByTags, setDropByTags] = useState<DropType[]>([]);

    const [loading, setLoading] = useState(true);
    const [upvoteLoading, setUpvoteLoading] = useState(true);

    const mostUpvoted = async () => {
        const res = await axios.get('/api/sidebar');

        setUpvotedDrops(res.data);
        setUpvoteLoading(false);
    };

    const getDropByTags = async () => {
        const res = await axios.post(`/api/sidebar/${drop._id}`, {
            tag: drop.tags[Math.floor(Math.random() * drop.tags.length)]
        });

        setDropByTags(res.data);
        setLoading(false);
    } 

    useEffect(() => {
        mostUpvoted();
        getDropByTags();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-[28%] fixed right-0 h-screen px-8 py-8 border-l border-[#A0A6B1]">

            {/*<div className="">
                <div className="text-2xl font-semibold my-2">Share what you found</div>

                <div className="">Social icons</div>
            </div>*/}

            <div className="border rounded-lg">
                <div className="text-2xl font-semibold my-2 mx-6 text-white">Top community picks</div>

                <div className="my-2">
                    {loading ? <span className="font-medium px-6 text-white text-lg">Loading...</span> : upvotedDrops.map((drop) => (
                        <div className="rounded px-6 py-2 hover:bg-[#24282E]" key={drop._id}>
                            <div className="text-xl text-[#BCC0C8] font-medium my-1">{drop.name}</div>

                            <div className="flex text-sm font-medium text-[#545964]">
                                <div className="flex space-x-2 mr-8">
                                    <div className="">{drop.upvotes ? drop.upvotes.length : 0}</div>
                                    <div className="">Upvotes</div>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="">{drop.links ? drop.links.length : 0}</div>
                                    <div className="">Items</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 border rounded-lg">
                <div className="text-2xl font-semibold my-2 mx-6 text-white">Drops you might like</div>

                <div className="my-2">
                    {loading ? <span className="font-medium px-6 text-white text-lg">Loading...</span> : dropByTags.map((drop) => (
                        <div className="rounded px-6 py-2 hover:bg-[#24282E]" key={drop._id}>
                            <div className="text-xl text-[#BCC0C8] font-medium my-1">{drop.name}</div>

                            <div className="flex text-sm font-medium text-[#545964]">
                                <div className="flex space-x-2 mr-8">
                                    <div className="">{drop.upvotes ? drop.upvotes.length : 0}</div>
                                    <div className="">Upvotes</div>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="">{drop.links ? drop.links.length : 0}</div>
                                    <div className="">Items</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar