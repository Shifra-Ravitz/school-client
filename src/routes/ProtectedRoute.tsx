import { Navigate, Outlet } from "react-router-dom"
import type { Role } from "../types"
import { useAuth } from "../context/AuthContext"
import { getHomePath } from "./getHomePath"
import Loading from "../components/Loading"
interface ProtectedRouteProps{
    allowedRoles:Role[]
}

const ProtectedRoute = ({allowedRoles}:ProtectedRouteProps) => {
const{user,isLoading} = useAuth()
    if(isLoading)
        return <Loading/>
    if(!user)
        return <Navigate to="/login" replace/>
    if(!allowedRoles.includes(user.role))
        return <Navigate to={getHomePath(user.role)} replace/>
    return <Outlet></Outlet>
}

export default ProtectedRoute