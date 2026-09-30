import { db } from "./firebase";
import { collection, deleteDoc, doc, updateDoc, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import type { Task } from "../types/Task"

export async function createTask(
    title: string,
    description: string,
    userId: string

) {

    await addDoc(
        collection(db, "tasks"),
        {
            title,
            description,
            userId,
            completed: false,
            createdAt: serverTimestamp()
        }

    )
}

export function getTasks(userId: string, callback: (tasks: Task[]) => void) {
    const tasksRef = collection(db, "tasks")
    const q = query(
        tasksRef,
        where("userId", "==", userId)
    )
    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Task[]
        callback(tasks)

    })

}

export async function updateTask(
    taskId: string,
    completed: boolean
) {
    const tasksRef = doc(db, "tasks", taskId)
    await updateDoc(tasksRef, {
        completed
    })

}

export async function deleteTask(taskId: string) {
    const taskRef = doc(db, "tasks", taskId)

    await deleteDoc(taskRef)
}