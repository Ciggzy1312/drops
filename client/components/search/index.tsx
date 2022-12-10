import { Dispatch, FC, SetStateAction, useState } from "react"
import { DropType } from "../../types/types"


const SearchBar: FC<{ drops: DropType[], setDrops: Dispatch<SetStateAction<DropType[]>> }> = ({ drops, setDrops }) => {

    const [search, setSearch] = useState('');

    const handleSearch = () => {

        if(search){
            setDrops(drops.filter(drop => drop.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setDrops(drops);
        }
    }

    return (
        <div className="flex-grow">
            <input className="px-2 py-1 border border-[#252728] bg-[#252728] w-1/4 rounded-l-md text-white focus:outline-none" type="text" placeholder="Search for drops" value={search} onChange={(e) => setSearch(e.target.value)} />

            <button className="text-white px-4 py-1 border border-[#3F8DFD] bg-[#3F8DFD] rounded-r-md" onClick={handleSearch} >Search</button>
        </div>
    )
}

export default SearchBar