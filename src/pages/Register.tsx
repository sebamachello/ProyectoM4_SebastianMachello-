import { useState, type FormEvent } from "react"
import { useAuth } from "../features/Authenticator"
import { getAuthErrorMessage } from "../utils/authErrors"
import { useNavigate } from "react-router-dom"



function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        try {
            await signUp(email, password)
            navigate("/tasks")
        }
        catch (error) {
            setError(getAuthErrorMessage(error))
        }
    }

    return (
        <main className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Crear cuenta</h1>
                <p className="auth-subtitle">
                    Registrate para empezar a organizar tus tareas.
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
                    placeholder="Creá una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="form-error">{error}</p>}

                <button type="submit">Registrarse</button>
            </form>
        </main>
    )
}
export default Register