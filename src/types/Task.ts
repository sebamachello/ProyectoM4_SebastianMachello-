import type { Timestamp } from "firebase/firestore"

export interface Task {
    title: string
    id: string
    description: string
    completed: boolean
    userId: string
    createdAt: Timestamp
}

