import { NextPage } from "next"
import RegisterForm from "../../components/auth/register"

const Register: NextPage = () => {
    return (
        <div className="bg-[#131517] min-h-screen">
            <RegisterForm />
        </div>
    )
}

export default Register