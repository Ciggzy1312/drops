import { useRouter } from "next/router"
import Link from "next/link"
import { FC, FormEvent, useState } from "react"
import axios from "axios"

const LoginForm: FC = () => {

    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const res = await axios.post(`/api/auth/login`, {
            email, password
        }, { withCredentials: true });
        console.log(res.data);

        router.push("/dashboard");
    }

    return (
        <div className="max-w-md m-auto flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">

            <div className="w-full">

                <div className="my-2">
                    <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
                    <p className="mt-1 text-sm font-medium text-[#A0A6B1]">Please enter your details</p>
                </div>

                <div className="">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="font-medium text-white">
                            <div className="flex flex-col">
                                <label className="py-2 text-sm">Email</label>
                                <input type="email" required value={email} className="px-3 py-2 bg-[#252728] border border-[#252728] text-[#BCC0C8] rounded-md focus:outline-none focus:border-[#3F8DFD] sm:text-sm" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="flex flex-col">
                                <label className="py-2 text-sm">Password</label>
                                <input type="password" required value={password} className="px-3 py-2 bg-[#252728] border border-[#252728] text-[#BCC0C8] rounded-md focus:outline-none focus:border-[#3F8DFD] sm:text-sm" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F8DFD] hover:bg-[#1877FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#1877FF]">Sign In</button>
                        </div>

                        <div className="mt-5 text-sm text-[#A0A6B1] text-center">
                            <h3 className="">Don&apos;t have an account? <Link href={"/auth/register"}><span className="text-[#73ACFF] hover:text-[#3F8DFD] font-medium cursor-pointer">Sign Up</span></Link></h3>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm