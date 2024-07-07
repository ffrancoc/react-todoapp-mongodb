import { StoreContext } from "@/contexts/storeContext"
import { ITask } from "@/db/interfaces"
import { MouseEvent, useContext, useEffect, useState } from "react"
import TaskEditDialog from "./TaskEditDialog"
import EditIcon from "./icons/EditIcon"
import CloseIcon from "./icons/CloseIcon"
import { ToastAction, ToastAnimation } from "@/app/interfaces/toast"

type Props = {
    task: ITask
}

function TaskListItem({ task }: Props) {
    const { updateTask, removeTask, addToast } = useContext(StoreContext)
    const [checked, setChecked] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [animation, setAnimation] = useState("animate-fade-down animate-once animate-duration-[1000ms]")


    useEffect(() => {
        setChecked(task.state === 1 ? 'line-through bg-blue-50' : 'bg-teal-50')
    }, [task.state])


    const handleCheck = async (event: MouseEvent) => {
        task.state = task.state === 1 ? 0 : 1
        const res = await updateTask(task)
        if (res) {
            if (task.state === 1) {
                addToast({ text: "Tarea Completada", action: ToastAction.Completed, animation: ToastAnimation.Added })
            } else {
                addToast({ text: "Tarea Incompleta", action: ToastAction.Uncompleted, animation: ToastAnimation.Added })
            }
        }

    }

    const handleEdit = () => {
        setOpenDialog(true)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const handleDelete = async (taskId: any) => {
        const res = await removeTask(taskId)
        if (res) {
            addToast({ text: "Tarea Eliminada", action: ToastAction.Removed, animation: ToastAnimation.Added })
        }
    }

    return (
        <>
            <li className={`flex items-center p-3 gap-2 text-gray-400  rounded-xl ${animation} ${checked}`} onDoubleClick={handleCheck}>
                <h3 className="flex-1">{task.title}</h3>
                <button className="hover:bg-slate-200 p-2 rounded-full" onClick={handleEdit}><EditIcon /></button>
                <button className="hover:bg-slate-200 p-2 rounded-full" onClick={e => handleDelete(task._id)}><CloseIcon /></button>
            </li>
            <TaskEditDialog show={openDialog} hide={closeDialog} task={task} />
        </>
    )
}

export default TaskListItem