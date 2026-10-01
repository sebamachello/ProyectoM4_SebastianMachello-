import { useState, useEffect, type FormEvent } from "react"
import { useAuth } from "../features/Authenticator"
import { createTask, getTasks, updateTask, deleteTask } from "../services/tasksService"
import type { Task } from "../types/Task"

function Tasks() {
    const { logout, user } = useAuth()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (!user) {
            return
        }

        const unsubscribe = getTasks(user.uid, setTasks)

        return () => unsubscribe()

    }, [user])


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!user) {
            return
        }

        await createTask(title, description, user.uid)

        setTitle("")
        setDescription("")
    }

    return (
        <main className="tasks-page">
            <div className="tasks-container">
                <header className="tasks-header">
                    <div>
                        <h1>Mis tareas</h1>
                        <p>Organizá y administrá tus pendientes.</p>
                    </div>

                    <button
                        className="logout-button"
                        type="button"
                        onClick={logout}
                    >
                        Cerrar Sesion
                    </button>
                </header>

                <form className="task-form" onSubmit={handleSubmit}>
                    <h2>Nueva tarea</h2>

                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit">
                        Crear tarea
                    </button>
                </form>

                <section className="task-list">
                    {tasks.map((task) => (
                        <article
                            className={`task-card ${task.completed ? "task-card--completed" : ""}`}
                            key={task.id}
                        >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>

                            <div className="task-actions">
                                <button
                                    type="button"
                                    onClick={() => updateTask(task.id, !task.completed)}
                                >
                                    {task.completed
                                        ? "Marcar pendiente"
                                        : "Marcar completada"}
                                </button>

                                <button
                                    className="delete-button"
                                    type="button"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    )

}
export default Tasks
