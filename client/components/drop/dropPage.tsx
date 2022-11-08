import Image from "next/image";
import { FC } from "react";
import { DropType } from "../../types/types";
import { format } from "timeago.js";
import { BsTriangleFill } from "react-icons/bs";
import bg from "../../public/No_14.jpg";


const DropPage: FC<{ drop: DropType }> = ({ drop }) => {

    return (
        <div className="flex-1 px-20 py-8">
            <div className="text-4xl font-bold my-2">{drop.name}</div>

            <div className="flex my-2">
                <div className="">
                    <Image className="rounded-full" src={drop.author.image ? drop.author.image : bg} width={30} height={30} alt="" />
                </div>
                <div className="text-medium self-center mx-3">Jane Appleseed</div>
            </div>

            <div className="my-2">{drop.description}</div>

            <div className="flex justify-between">

                <div className="flex text-[#443F3F]">
                    <div className="flex mr-4 space-x-1">
                        <div className="self-center mr-0.5"><BsTriangleFill /></div>
                        <div className="">{drop.upvotes ? drop.upvotes.length : 0}</div>
                        <div className="">upvotes</div>
                    </div>

                    <div className="flex mx-4 space-x-1">
                        <div className="">{format(drop.createdAt)}</div>
                    </div>
                </div>
                
                <div className="flex">
                    <div className="mx-6 text-sky-500">Edit</div>

                    <div className="text-red-500">Delete</div>
                </div>
            </div>

            <div className="flex my-4">
                {drop.tags.map((tag, index) => (
                    <div className="mr-2" key={index}>
                        <button className="bg-[#D0CDCD] rounded-md px-2 py-0.5 font-medium text-[#443F3F]">{tag}</button></div>
                ))}
            </div>

            <div className="flex justify-between my-10">
                <div className="text-2xl font-semibold">List of links</div>

                <div className="">
                    <button className="bg-indigo-500 rounded-md px-5 py-1 font-medium text-white">Add link</button>
                </div>
            </div>

            <div className="">
                {drop.links.map((link, index) => (
                    <div className="my-6 flex justify-between h-44 border border-indigo-500 rounded-md px-4 py-2" key={index}>
                        <div className="w-[60%]">
                            <div className="font-semibold text-lg">{link.title}</div>
                            <div className="text-[#443F3F] text-sm my-2">{link.description}</div>
                        </div>

                        <div className="w-1/4 overflow-hidden">
                            {link.image && <picture>
                                <source srcSet={link.image} type="image/webp" />
                                <img className="rounded object-contain" src={link.image} alt="Landscape picture" />
                            </picture>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropPage