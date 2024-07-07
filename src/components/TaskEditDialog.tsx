import { ITask } from "@/db/interfaces"
import { FormEvent, FormEventHandler, LegacyRef, useContext, useEffect, useRef, useState } from "react"
import CloseIcon from "./icons/CloseIcon"
import { StoreContext } from "@/contexts/storeContext"
import { ToastAction, ToastAnimation } from "@/app/interfaces/toast"


type Props = {
    show: boolean
    hide: () => void
    task: ITask
}

function TaskEditDialog({ show, hide, task }: Props) {
    const { updateTask, addToast } = useContext(StoreContext)
    const [title, setTitle] = useState(task.title)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [animation, setAnimation] = useState("animate-flip-down animate-once animate-duration-[1000ms]")


    const openModal = () => {
        setTitle(task.title)
        setAnimation("animate-flip-down animate-once animate-duration-[1000ms]");
        (dialogRef.current as unknown as HTMLDialogElement).showModal()
    }

    const closeModal = () => {
        setAnimation("animate-jump-out animate-once animate-duration-[1000ms]");
        setTimeout(() => {
            (dialogRef.current as unknown as HTMLDialogElement).close()
            hide()
        }, 1005)

    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (title.trim().length > 0 && title !== task.title) {
            task.title = title
            const res = await updateTask(task)
            if (res) {
                addToast({ text: "Tarea Editada", action: ToastAction.Updated, animation: ToastAnimation.Added })
                setAnimation("animate-ping animate-once animate-duration-[500ms]")
            }
            closeModal()
        }
    }

    useEffect(() => {
        if (show) {
            openModal()
        }
    }, [show])

    return (
        <dialog className="bg-transparent backdrop:bg-slate-900 backdrop:bg-opacity-70" ref={dialogRef} onCancel={e => e.preventDefault()}>
            <div className={`w-80 flex flex-col gap-5 rounded-2xl bg-white p-4 ${animation}`}>
                <div className="flex justify-end">
                    <button onClick={closeModal}><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} method="PATCH">
                    <input type="text" className="w-full p-2 rounded-lg bg-teal-50 text-gray-400 focus:outline-none" value={title} onChange={e => setTitle(e.target.value)} />
                </form>
            </div>

        </dialog>
    )
}

export default TaskEditDialog