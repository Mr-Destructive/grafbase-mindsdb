import {login} from "../../connect";

export default async function DatabaseCreate(_, {auth, input }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;

        const body = JSON.stringify({
            database:{
                name: input.name,
                engine: input.engine,
                parameters: input.parameters
            }
        })
        console.log(body)

        const databaseResponse = await fetch(`${baseUrl}/api/databases`, {
            method: 'POST',
            headers: headers,
            body: body,
            credentials: 'include'
        });

        if (databaseResponse.status !== 201) {
            throw new Error('Failed to create database');
        }
        const database = await databaseResponse.json();
        return database;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating database');
        return null
    }
}
