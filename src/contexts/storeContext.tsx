"use client"

import { Toast, ToastAnimation } from '@/app/interfaces/toast'
import { ITask } from '@/db/interfaces'
import { createContext, ReactNode, useCallback, useState } from 'react'

type Props = {
    children: ReactNode
}

type TStoreContext = {
    tasks: Array<ITask>
    toasts: Array<Toast>
    loadTasks: () => Promise<void>
    saveTask: (task: ITask) => Promise<boolean>
    updateTask: (task: ITask) => Promise<boolean>
    removeTask: (taskId: any) => Promise<boolean>
    addToast: (toask: Toast) => void
}

const StoreContextDefault: TStoreContext = {
    tasks: [],
    toasts: [],
    loadTasks: () => new Promise((resolve, reject) => resolve()),
    saveTask: () => new Promise((resolve, reject) => resolve(false)),
    updateTask: () => new Promise((resolve, reject) => resolve(false)),
    removeTask: () => new Promise((resolve, reject) => resolve(false)),
    addToast: (toast: Toast) => { }
}

export const StoreContext = createContext<TStoreContext>(StoreContextDefault)

export const StoreContextProvider = ({ children }: Props) => {

    const [tasks, setTasks] = useState<Array<ITask>>([])
    const [toasts, setToasts] = useState<Array<Toast>>([])

    const addToast = useCallback((toast: Toast) => {
        setToasts(prevToasts => [...prevToasts, toast])


        setTimeout(() => {
            setToasts(prevToasts => [...prevToasts.slice(1)])
        }, 3000)

    }, [])

    const loadTasks = useCallback(async () => {
        const resp = await fetch("/api/tasks", { method: "GET" })
        const data = await resp.json()
        if (data.status === 200) {
            setTasks(data.data.tasks)
        }
    }, [])

    const saveTask = useCallback(async (task: ITask) => {
        const resp = await fetch("/api/tasks", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(task)
        })

        const data = await resp.json()
        if (data.status == 200) {
            await loadTasks()
            return true
        }
        return false
    }, [])

    const updateTask = useCallback(async (task: ITask) => {
        const resp = await fetch("/api/tasks", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                "id": task._id,
                "title": task.title,
                "state": task.state
            })
        })

        const data = await resp.json()
        if (data.status == 200) {
            await loadTasks()
            return true
        }
        return false
    }, [])

    const removeTask = useCallback(async (taskId: any) => {
        const resp = await fetch("/api/tasks", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({ "id": taskId })
        })

        const data = await resp.json()
        if (data.status == 200) {
            await loadTasks()
            return true
        }

        return false
    }, [])


    return < StoreContext.Provider value={{ tasks, toasts, loadTasks, saveTask, updateTask, removeTask, addToast }} >
        {children}
    </StoreContext.Provider >
}
