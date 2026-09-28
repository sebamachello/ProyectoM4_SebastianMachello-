import { FirebaseError } from "firebase/app"

export function getAuthErrorMessage(error: unknown) {
    if (!(error instanceof FirebaseError)) {
        return "Ocurrió un error inesperado"

    }
    switch (error.code) {
        case "auth/email-already-in-use":
            return "Este correo ya esta Registrado"
        case "auth/weak-password":
            return "Contraseña es demasiado débil"

        case "auth/invalid-credential":
            return "Email o contraseña incorrectos"

        default:
            return "Ocurrio un error de autenticación"
    }


}

