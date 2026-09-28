import { useAuth } from "../features/Authenticator"

function Tasks() {
    const { logout } = useAuth()
    return (
        <button onClick={logout}>
            Cerrar Sesion
        </button>

    )

}
export default Tasks
