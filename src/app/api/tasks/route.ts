import { connection } from '@/db/client'
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const taskId = params.get("id")

    const { client, db } = await connection("tasksdb")

    try {
        if (taskId !== null) {
            const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) })
            return NextResponse.json({ status: 200, data: task })
        } else {
            const tasks = await db.collection("tasks").find({}).sort({ "create_at": -1 }).toArray()
            return NextResponse.json({ status: 200, data: { tasks } })
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: "Internal server error" })
    } finally {
        client.close()
    }
}


export async function POST(request: NextRequest) {
    const { client, db } = await connection("tasksdb")
    try {
        const body = await request.json()
        const task = await db.collection("tasks").insertOne(body)
        return NextResponse.json({ status: 200, message: `Nueva Tarea creada con el _id:${task.insertedId} exitosamente` })
    } catch (err) {
        return NextResponse.json({ status: 500, message: "Internal server error" })
    } finally {
        client.close()
    }
}


export async function PATCH(request: NextRequest) {
    const { client, db } = await connection("tasksdb")
    try {
        const body = await request.json()

        if (body.hasOwnProperty("id") && body.hasOwnProperty("title") && body.hasOwnProperty("state")) {

            const title = body.title
            const state = body.state
            const task = await db.collection("tasks").updateOne({ _id: new ObjectId(`${body.id}`) }, { $set: { title: title, state: state } })

            return NextResponse.json({ status: 200, message: `Tarea Actualizada Correctamente` })
        }
        return NextResponse.json({ status: 400, message: `Bad Request` })
    } catch (err) {
        return NextResponse.json({ status: 500, message: "Internal server error" })
    } finally {
        client.close()
    }
}



export async function DELETE(request: NextRequest) {
    const { client, db } = await connection("tasksdb")
    try {
        const body = await request.json()

        if (body.hasOwnProperty("id")) {

            const state = body.state
            const task = await db.collection("tasks").deleteOne({ _id: new ObjectId(`${body.id}`) })

            return NextResponse.json({ status: 200, message: `Tarea Eliminada Correctamente` })
        }
        return NextResponse.json({ status: 400, message: `Bad Request` })
    } catch (err) {
        return NextResponse.json({ status: 500, message: "Internal server error" })
    } finally {
        client.close()
    }
}