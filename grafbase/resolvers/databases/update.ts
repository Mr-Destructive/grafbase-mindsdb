import {login} from "../../connect";

export default async function DatabaseUpdate(_, {auth, databaseName, input }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;

        const body = JSON.stringify({
            database:{
                engine: input.engine,
                parameters: input.parameters
            }
        })

        const databaseResponse = await fetch(`${baseUrl}/api/databases/${databaseName}`, {
            method: 'PUT',
            headers: headers,
            body: body,
            credentials: 'include'
        });

        if (databaseResponse.status !== 200) {
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
