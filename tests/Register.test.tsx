import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Register from "../src/pages/Register"
import Authenticator from "../src/features/Authenticator"

describe("Register", () => {
    it("muestra el botón de registro", () => {

        render(
            <Authenticator>
                <Register />
            </Authenticator>
        )
        expect(
            screen.getByRole("button", { name: "Registrarse" })
        ).toBeTruthy()

    })
})