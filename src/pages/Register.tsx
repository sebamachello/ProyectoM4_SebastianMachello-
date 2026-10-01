import { useState, type FormEvent } from "react"
import { useAuth } from "../features/Authenticator"
import { getAuthErrorMessage } from "../utils/authErrors"



function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        try {
            await signUp(email, password)
        }
        catch (error) {
            setError(getAuthErrorMessage(error))
        }
    }
    const { signUp } = useAuth()

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

            <button type="submit">Registrarse</button>
        </form>
    )
}
export default Register