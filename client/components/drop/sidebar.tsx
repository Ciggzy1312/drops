import { FC } from "react";


const Sidebar: FC = () => {
    return (
        <div className="w-[28%] h-screen px-8 py-8 border-l-2 border-[#F3F3F3]">

            <div className="">
                <div className="text-2xl font-semibold my-2">Share what you found</div>

                <div className="">Social icons</div>
            </div>

            <div className="">
                <div className="text-2xl font-semibold my-2">Top community picks</div>

                <div className="">Most upvoted drops</div>
            </div>

            <div className="">
                <div className="text-2xl font-semibold my-2">Drops you might like</div>

                <div className="">Drops you might like</div>
            </div>
        </div>
    )
}

export default Sidebar