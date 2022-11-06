import Image from "next/image";
import { FC } from "react";
import { DropType } from "../../types/types";
import { format } from "timeago.js"
import { BsTriangleFill } from "react-icons/bs";
import bg from "../../public/No_14.jpg";


const DropCard: FC<{ drop: DropType }> = ({ drop }) => {

    return (
        <div className="p-4 border-2 border-slate-200 bg-white rounded-md">
            <div className="flex">
                <div className="text-xs py-1 px-2 bg-gray-200 rounded-2xl font-semibold text-gray-600">{drop.tags[0]}</div>
                <div className="text-xs py-1 px-2 font-semibold text-gray-600">
                    {drop.tags.length > 1 ? ` +${drop.tags.length - 1}` : ``}
                </div>
            </div>

            <div className="my-4">
                <div className="relative w-[65%] h-[120px]">
                    <Image className="" src={bg} layout="fill" alt=""/>
                </div>
            </div>

            <div className="text-xl font-bold">{drop.name}</div>

            <div className="flex">
                <div className="">
                    <Image className="rounded-full" src={drop.author.image ? drop.author.image : bg} width={30} height={30} alt=""/>
                </div>
                <div className="text-base self-center mx-2">Jane Appleseed</div>
            </div>


            <div className="text-xs text-neutral-500">These are the top resources I have collected to help you learn Javascript in the best possible and beginner friendly way These are the top resources I have collected to help you learn Javascript in the best possible and beginner friendly way...</div>

            <div className="flex text-neutral-500 text-sm my-3 font-medium">
                <div className="flex mr-4 space-x-1 text-[#443F3F]">
                    <div className="self-center mr-0.5"><BsTriangleFill /></div>
                    <div className="">{drop.upvotes ? drop.upvotes.length : 0}</div>
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