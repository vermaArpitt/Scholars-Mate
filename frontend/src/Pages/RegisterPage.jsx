import AuthForm from '../Components/AuthForm'

export default function RegisterPage() {
    return(
        <AuthForm route="/api/user/register/" method="register" />
    )
}