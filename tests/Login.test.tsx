import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import Authenticator from "../src/features/Authenticator"
import Login from "../src/pages/Login"

describe("Login", () => {
    it("muestra el botón de iniciar sesión", () => {
        render(
            <MemoryRouter>
                <Authenticator>
                    <Login />
                </Authenticator>
            </MemoryRouter>
        )

        expect(
            screen.getByRole("button", { name: "Iniciar Sesion" })
        ).toBeTruthy()
    })
})