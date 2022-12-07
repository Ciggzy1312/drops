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
        <div className="flex justify-between py-3">
            <div className="">
                <span className="text-3xl font-bold text-[#3F8DFD] tracking-wider">Drops</span>
            </div>

            <div className="flex">
                <div className="self-center">
                    <div className="mx-2 relative w-[2rem] h-[2rem] rounded-full overflow-hidden object-contain">
                        <Image src="/No_14.jpg" layout="fill" alt="" />
                    </div>
                </div>

                <div className="self-center">
                    <button className="font-medium rounded px-3 py-1 text-red-600 hover:bg-indigo-100" onClick={logout}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar