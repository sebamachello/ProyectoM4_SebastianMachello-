import type { ReactNode } from "react";
import { useAuth } from "../features/Authenticator";
import { Navigate, useLocation } from "react-router-dom";



interface RequireAuthProps {
    children: ReactNode

}
function RequireAuth({ children }: RequireAuthProps) {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <p>Cargando sesión</p>
    }

    if (!user) {
        return <Navigate to="/login"
            state={{
                from: location
            }} />

    }

    return children





}

export default RequireAuth