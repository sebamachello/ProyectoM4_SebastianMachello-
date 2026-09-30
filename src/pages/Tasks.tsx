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
        <>
            <form onSubmit={handleSubmit} >

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
                <button type="submit">
                    Crear tarea
                </button>
                <button type="button" onClick={logout}>
                    Cerrar Sesion
                </button>

            </form>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <button
                        type="button"
                        onClick={() => updateTask(task.id, !task.completed)}
                    >
                        {task.completed ? "Marcar pendiente" : "Marcar completada"}
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                    >
                        Eliminar
                    </button>
                </div>
            ))}

        </>



    )

}
export default Tasks
