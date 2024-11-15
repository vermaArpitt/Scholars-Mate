import AuthForm from '../Components/AuthForm'

export default function LoginPage() {
    return(
        <AuthForm route="/api/token/" method="login"/>
    )
}