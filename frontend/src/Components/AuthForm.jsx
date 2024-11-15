import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

export default function LoginForm({route, method}) {
    const formName = method === "login"? "Login" : "Register";
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(route, {username, password});
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (err) {
            alert(err);
        }
    }

    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <h1> {formName} </h1>
            <input 
                type="text" 
                className="form-input" 
                value={username} 
                placeholder="Username" 
                required 
                onChange={(e) => {setUsername(e.target.value)}}
            />
            <input 
                type="password" 
                className="form-input" 
                value={password} 
                placeholder="Password" 
                required 
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <button type="submit" > {formName} </button>
        </form>
    )
}