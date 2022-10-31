import Link from "next/link"
import { FC, FormEvent, useState } from "react"

const LoginForm: FC = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({
            email, password
        })

        setEmail("")
        setPassword("")
    }

    return (
        <div className="max-w-md m-auto flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">

            <div className="w-full">

                <div className="my-2">
                    <h2 className="mt-6 text-3xl font-bold text-gray-700">Welcome back</h2>
                    <p className="mt-1 text-sm font-medium text-gray-400">Please enter your details</p>
                </div>

                <div className="">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="font-medium text-neutral-500">
                            <div className="flex flex-col">
                                <label className="py-2 text-sm">Email</label>
                                <input type="email" required value={email} className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:border-indigo-400 sm:text-sm" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="flex flex-col">
                                <label className="py-2 text-sm">Password</label>
                                <input type="password" required value={password} className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:border-indigo-400 sm:text-sm" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
                        </div>

                        <div className="mt-5 text-sm text-gray-500 text-center">
                            <h3 className="">Don&apos;t have an account? <Link href={"/auth/register"}><span className="text-indigo-400 font-medium cursor-pointer">Sign Up</span></Link></h3>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm