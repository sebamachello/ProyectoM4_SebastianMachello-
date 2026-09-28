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
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button type="submit">Iniciar Sesion</button>
        </form>
    )
}

export default Login

