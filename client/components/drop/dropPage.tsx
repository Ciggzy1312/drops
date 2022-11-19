import Image from "next/image";
import { FC, useState } from "react";
import { DropType } from "../../types/types";
import { format } from "timeago.js";
import { BsTriangleFill } from "react-icons/bs";
import bg from "../../public/No_14.jpg";
import AddLink from "../form/addLink";
import axios from "axios";
import Link from "next/link";
import EditDrop from "../form/editDrop";


const DropPage: FC<{ drop: DropType, token: string }> = ({ drop : d, token }) => {

    const [drop, setDrop] = useState(d);

    const [isOpen, setIsOpen] = useState(false)
    const [isUpvoted, setIsUpvoted] = useState(drop.upvotes?.includes(token) ? true : false)
    const [upvotes, setUpvotes] = useState(drop.upvotes ? drop.upvotes.length : 0)

    const [editForm, setEditForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false) 

    const deleteLink = async (urlId: string) => {
        const res = await axios.patch(`/api/drop/${drop._id}/deleteLink`, {
            urlId
        });
        console.log(res.data);
    }

    const handleUpvote = async () => {
        console.log("upvoted");

        const res = await axios.patch(`/api/drop/${drop._id}/upvote`);
        console.log(res.data);

        setIsUpvoted(!isUpvoted);
        setUpvotes(isUpvoted ? upvotes - 1 : upvotes + 1);
    }

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
                    <div className={`flex mr-4 space-x-1 cursor-pointer ${isUpvoted && "text-sky-600"}`} onClick={handleUpvote}>
                        <div className="self-center mr-0.5"><BsTriangleFill /></div>
                        <div className="">{upvotes}</div>
                        <div className="">upvotes</div>
                    </div>

                    <div className="flex mx-4 space-x-1">
                        <div className="">{format(drop.createdAt)}</div>
                    </div>
                </div>

                <div className="flex">
                    {token === drop.author._id && <div className="mx-6">
                        <button className="text-sky-500" onClick={() => setEditForm(!editForm)}>Edit</button>
                        {editForm && <EditDrop drop={drop} setDrop={setDrop} isOpen={editForm} setIsOpen={setEditForm} id={drop._id} />}
                    </div>}

                    {token === drop.author._id && <div className="">
                        <button className="text-red-500">Delete</button>
                    </div>}
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
                    <button className="bg-indigo-500 rounded-md px-5 py-1 font-medium text-white" onClick={(e) => setIsOpen(!isOpen)}>Add link</button>

                    {isOpen && <AddLink isOpen={isOpen} setIsOpen={setIsOpen} id={drop._id} />}
                </div>
            </div>

            <div className="">
                {drop.links.length ? drop.links.map((link, index) => (
                    <div className="flex flex-col justify-between my-6 min-h-[10rem] border border-indigo-500 rounded-md px-4 py-2" key={index}>
                        <div className="flex justify-between" key={index}>
                            <div className="w-[60%]">
                                <div className="font-semibold text-lg"><Link href={link.url}>{link.title}</Link></div>
                                <div className="text-[#443F3F] text-sm my-2">{link.description}</div>
                            </div>

                            <div className="w-1/4 overflow-hidden">
                                {link.image && <picture>
                                    <source srcSet={link.image} type="image/webp" />
                                    <img className="rounded object-contain" src={link.image} alt="Landscape picture" />
                                </picture>}
                            </div>
                        </div>

                        <div className="text-xs">
                            <button className="text-red-600 font-medium" onClick={() => deleteLink(link._id)}>Delete Link</button>
                        </div>
                    </div>
                )) : <div className="text-gray-500 text-xl italic">You have not added any links</div>}
            </div>
        </div>
    )
}

export default DropPage