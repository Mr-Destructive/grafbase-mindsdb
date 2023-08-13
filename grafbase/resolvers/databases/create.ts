import {login} from "../../connect";

export default async function DatabaseCreate(_, {auth, input }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;

        const body = JSON.stringify({
            databases:{
                name: input.name,
                engine: input.engine
            },
            parameters: {
                database: input.database,
                user: input.user,
                password: input.password,
                host: input.host,
                port: input.port
            }
        })

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
        return null;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating database');
        return null
    }
}
