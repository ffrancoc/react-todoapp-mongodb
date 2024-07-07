"use client"

import { ITask } from "@/db/interfaces"
import TaskListItem from "./TaskListItem"
import { useEffect } from "react"

type Props = {
    tasks: Array<ITask>
}


function TaskList({ tasks }: Props) {


    return (
        <ul className="flex-1 flex flex-col gap-4 p-8 bg-white shadow-md rounded-xl overflow-scroll">
            {tasks.map(t => <TaskListItem task={t} key={t._id} />)}
        </ul>
    )
}

export default TaskList