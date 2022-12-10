import { NextPage } from "next"
import LoginForm from "../../components/auth/login"

const Login: NextPage = () => {
    return (
        <div className="bg-[#131517] min-h-screen">
            <LoginForm />
        </div>
    )
}

export default Login