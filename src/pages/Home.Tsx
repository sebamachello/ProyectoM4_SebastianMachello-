import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <h1>Inicio</h1>

            <Link to={"/login"}>Iniciar sesión</Link>
            <Link to={"/register"}>Registro</Link>
            <Link to={"/tasks"}>Tareas</Link>

        </>
    )
}

export default Home 