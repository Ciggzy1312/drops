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
        <div className="w-[28%] h-screen px-8 py-8 border-l-2 border-[#F3F3F3]">

            <div className="">
                <div className="text-2xl font-semibold my-2">Share what you found</div>

                <div className="">Social icons</div>
            </div>

            <div className="py-2">
                <div className="text-2xl font-semibold my-2">Top community picks</div>

                <div className="my-2">
                    {loading? <span className="font-medium text-lg">Loading...</span> : upvotedDrops.map((drop) => (
                        <div className="border-2 border-neutral-200 rounded px-4 my-2 py-2 hover:bg-gray-200" key={drop._id}>
                            <div className="text-xl font-medium">{drop.name}</div>
                            <div className="">{drop.author.username}</div>

                            <div className="flex text-sm text-[#443F3F]">
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

            <div className="">
                <div className="text-2xl font-semibold my-2">Drops you might like</div>

                <div className="my-2">
                    {loading ? <span className="font-medium text-lg">Loading...</span> : dropByTags.map((drop) => (
                        <div className="border-2 border-neutral-200 rounded px-4 my-2 py-2 hover:bg-gray-200" key={drop._id}>
                            <div className="text-xl font-medium">{drop.name}</div>
                            <div className="">{drop.author.username}</div>

                            <div className="flex text-sm text-[#443F3F]">
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