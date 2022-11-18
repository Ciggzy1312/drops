import { FC } from "react"


const SearchBar: FC = () => {

    return (
        <div className="flex-grow">
            <input className="px-2 py-1 border border-gray-400 w-1/4 rounded-l-md focus:outline-none" type="text" placeholder="Search for drops" />

            <button className="text-white px-4 py-1 border border-black bg-black rounded-r-md">Search</button>
        </div>
    )
}

export default SearchBar