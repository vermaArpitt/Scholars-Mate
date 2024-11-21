import { useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css'

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/logout");
    }
    return(
        <nav className="navbar">
            <div className="name"> scholars' mate </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    )
}