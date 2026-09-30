import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Tasks from "../src/pages/Tasks"

vi.mock("../src/features/Authenticator", () => ({
    useAuth: () => ({
        user: { uid: "usuario-test" },
        logout: vi.fn()
    })
}))

vi.mock("../src/services/tasksService", () => ({
    getTasks: vi.fn(() => vi.fn()),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn()
}))

describe("Tasks", () => {
    it("muestra el botón para crear una tarea", () => {
        render(<Tasks />)

        expect(
            screen.getByRole("button", { name: "Crear tarea" })
        ).toBeTruthy()
    })
})