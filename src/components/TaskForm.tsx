"use client"

import { ToastAction, ToastAnimation } from "@/app/interfaces/toast"
import { StoreContext } from "@/contexts/storeContext"
import { ITask } from "@/db/interfaces"
import { FormEvent, useContext, useState } from "react"


function TaskForm() {

    const { saveTask, addToast } = useContext(StoreContext)
    const [title, setTitle] = useState('')


    const saveData = async () => {
        if (title.trim().length > 0) {
            const task: ITask = {
                title: title,
                state: 0,
                create_at: new Date()
            }

            const res = await saveTask(task)
            setTitle("")

            addToast({ text: "Tarea Agregada", action: ToastAction.Added, animation: ToastAnimation.Added })
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await saveData()
    }


    return (
        <>
            <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-4 p-8 rounded-xl bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ingresar tarea" className="flex-1 py-3 px-5 bg-teal-50 rounded-xl text-gray-400 focus:outline-none" />
                    <button type="submit" className="p-3 rounded-xl text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-800">Agregar</button>
                </div>
            </form>
        </>
    )
}

export default TaskForm