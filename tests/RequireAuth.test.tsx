import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import RequireAuth from "../src/routes/RequireAuth"

vi.mock("../src/features/Authenticator", () => ({
    useAuth: () => ({
        user: null,
        loading: true
    })
}))

describe("RequireAuth", () => {
    it("muestra cargando mientras verifica la sesión", () => {
        render(
            <MemoryRouter>
                <RequireAuth>
                    <p>Contenido protegido</p>
                </RequireAuth>
            </MemoryRouter>
        )

        expect(
            screen.getByText("Cargando sesión")
        ).toBeTruthy()
    })
})