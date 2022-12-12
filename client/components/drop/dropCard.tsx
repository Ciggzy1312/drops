import Image from "next/image";
import { FC, useState } from "react";
import { DropType } from "../../types/types";
import { format } from "timeago.js"
import { BsTriangleFill } from "react-icons/bs";
import bg from "../../public/No_14.jpg";
import Link from "next/link";
import axios from "axios";


const DropCard: FC<{ drop: DropType, token: string }> = ({ drop, token }) => {

    const [isUpvoted, setIsUpvoted] = useState(drop.upvotes?.includes(token) ? true : false)
    const [upvotes, setUpvotes] = useState(drop.upvotes ? drop.upvotes.length : 0)

    const handleUpvote = async () => {
        const res = await axios.patch(`/api/drop/${drop._id}/upvote`);
        console.log(res.data);

        setIsUpvoted(!isUpvoted);
        setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);
    }
    
    return (
        <div className="p-4 bg-[#1A1C1E] rounded-lg shadow-2xl drop-shadow-2xl">
            <div className="flex">
                <div className="text-xs py-1 px-2 bg-[#545964] rounded-xl font-semibold text-[#BCC0C8]">{drop.tags[0]}</div>
                <div className="text-xs py-1 px-2 font-semibold text-[#BCC0C8]">
                    {drop.tags.length > 1 ? ` +${drop.tags.length - 1}` : ``}
                </div>
            </div>

            <div className="my-4">
                <div className="relative w-[15.625rem] h-[7.875rem] overflow-hidden">
                        {drop.links.length === 0 ? <>
                        <Image className="rounded object-cover" src={bg} layout="fill" alt="" />
                        </> : <>
                            <picture>
                                <source srcSet={drop.links[0].image} type="image/webp" />
                                <img className="rounded object-cover" src={drop.links[0].image} alt="Landscape picture" />
                            </picture>
                        </> }
                </div>
            </div>

            <div className="text-xl text-white font-bold my-4"><Link href={`/dashboard/${drop._id}`}>{drop.name.length < 30 ? drop.name : `${drop.name.substring(0, 35)}...`}</Link></div>

            <div className="flex">
                <div className="">
                    <Image className="rounded-full" src={drop.author.image ? drop.author.image : bg} width={25} height={25} alt=""/>
                </div>
                <div className="text-white mx-3">{drop.author.username}</div>
            </div>


            <div className="text-xs text-[#BCC0C8] my-2">{drop.description.length < 100 ? drop.description : `${drop.description.substring(0, 100)}...`}</div>

            <div className="flex justify-between text-[#A0A6B1] text-sm my-3 font-medium">
                <div className={`flex mr-4 space-x-1 cursor-pointer ${isUpvoted && "text-[#28C87B]"}`} onClick={handleUpvote}>
                    <div className="self-center mr-0.5"><BsTriangleFill /></div>
                    <div className="">{upvotes}</div>
                    <div className="">upvotes</div>
                </div>

                <div className="flex mr-4 space-x-1">
                    <div className="">{drop.links ? drop.links.length : 0}</div>
                    <div className="">items</div>
                </div>

                <div className="mr-4">
                    <div className="">{format(drop.createdAt)}</div>
                </div>
            </div>
        </div>
    )
};

export default DropCard;