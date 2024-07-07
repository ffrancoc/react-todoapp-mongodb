import { StoreContext } from "@/contexts/storeContext"
import { useContext } from "react"

function InfoOverlay() {
    const { tasks } = useContext(StoreContext)


    return (
        <div className="absolute flex flex-col items-center gap-3 bottom-8 mx-auto bg-slate-800 text-white p-4 rounded-md">
            <p className="font-semibold text-sm">Tareas</p>
            <div className="flex gap-2">
                <p className="text-[.8rem]">Completas {tasks.filter(t => t.state === 1).length}</p>
                <p className="text-[.8rem]">Incompletas {tasks.filter(t => t.state === 0).length}</p>
                <p className="text-[.8rem]">Total {tasks.length}</p>
            </div>

        </div>
    )
}

export default InfoOverlay