import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"


const NavBar: FC = () => {

    const router = useRouter()

    const logout = async () => {
        const res = await axios.get('/api/auth/logout');
        console.log(res.data);

        router.push('/auth/login');
    }

    return (
        <div className="flex justify-between py-5 border-b-2 border-gray-100">
            <div className="">
                <span className="text-4xl font-bold text-indigo-500 tracking-wider">Drops</span>
            </div>

            <div className="flex">
                <div className="self-center">
                    <div className="mx-4 relative w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden object-contain">
                        <Image src="/No_14.jpg" layout="fill" alt="" />
                    </div>
                </div>

                <div className="self-center">
                    <button className="font-medium text-lg rounded px-3 py-1 text-red-600 hover:bg-indigo-100" onClick={logout}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar