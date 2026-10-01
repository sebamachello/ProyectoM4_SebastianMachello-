import { Link } from "react-router-dom"

function Home() {
    return (
        <main className="home">
            <div className="home__card">
                <h1>Gestor de Tareas</h1>

                <p>
                    Organizá tus tareas de forma simple y mantené tus pendientes al día.
                </p>

                <div className="home__actions">
                    <Link to="/login">Iniciar sesión</Link>
                    <Link to="/register">Registrarse</Link>
                </div>
            </div>
        </main>
    )
}

export default Home