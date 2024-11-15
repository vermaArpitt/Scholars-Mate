import Overview from '../Components/Overview'
import AuthForm from '../Components/AuthForm'
import '../Styles/LoginPage.css'

export default function RegisterPage() {
    return(
        <div className="auth-container">
            <Overview/>
            <AuthForm route="/api/user/register/" method="register" />
        </div>
    )
}