import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { onAuthStateChanged, createUserWithEmailAndPassword, type User } from "firebase/auth"
import { auth } from "../services/firebase"
interface AuthContextValue {
    user: User | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<void>

}
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthenticatorProps {
    children: ReactNode
}

function Authenticator({ children }: AuthenticatorProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })

        return () => unsubscribe()


    }, [])
    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de Authenticator")
    }
    return context
}

export default Authenticator
