import { useState, type FormEvent } from "react"
import { useAuth } from "../features/Authenticator"
import { useNavigate, useLocation } from "react-router-dom"
import { getAuthErrorMessage } from "../utils/authErrors"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/tasks"
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        try {
            await signIn(email, password)
            navigate(from)


        } catch (error) {
            setError(getAuthErrorMessage(error))
        }
    }

    return (
        <main className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <p className="auth-subtitle">
                    Ingresá a tu cuenta para administrar tus tareas.
                </p>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Ingresá tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="form-error">{error}</p>}

                <button type="submit">Iniciar Sesion</button>
            </form>
        </main>
    )
}

export default Login

