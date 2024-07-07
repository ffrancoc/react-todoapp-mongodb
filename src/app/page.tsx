"use client"

import InfoOverlay from "@/components/InfoOverlay"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import ToastItem from "@/components/ToastItem"
import { StoreContext } from "@/contexts/storeContext"
import { useContext, useEffect } from "react"

function Home() {
  const { tasks, toasts, loadTasks } = useContext(StoreContext)

  useEffect(() => {
    // Cargar las tareas 
    loadTasks()
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-amber-200 to-yellow-400">
      <div className="h-full flex justify-center py-10 relative">
        <div className="container flex flex-col gap-4 p-4">
          <TaskForm />
          <TaskList tasks={tasks} />
        </div>
        <InfoOverlay />
        <div className="absolute z-10 top-10 sm:top-96 right-10 flex flex-col gap-3">
          {toasts.map((toast, index) => <ToastItem key={index} toast={toast} />)}
        </div>
      </div>
    </div>
  )
}

export default Home