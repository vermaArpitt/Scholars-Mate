import Overview from '../Components/Overview'
import AuthForm from '../Components/AuthForm'
import '../Styles/LoginPage.css'

export default function LoginPage() {
    return(
        <div className="auth-container">
            <Overview/>
            <AuthForm route="/api/token/" method="login"/>
        </div>
    )
}