import { MongoClient, Db } from "mongodb"

const URL = process.env.MONGO_URL

type Connection = {
    client: MongoClient
    db: Db
}

export const connection = async (dbName: string) => {
    const client = await MongoClient.connect(`${URL}`)
    const db = client.db(dbName)

    return { client, db } as Connection
}
