import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { useEffect, useState } from "react";

export default function ProtectedRoutes({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect (() => {
        auth().catch(() => {
            setIsAuthorized(false)
        })
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', {refresh: refreshToken})
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (err){
            alert(err);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        const tokenExpiration = decoded.exp;

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized? children : <Navigate to="/login"/>
}