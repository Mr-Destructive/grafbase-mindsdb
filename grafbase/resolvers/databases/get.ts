import {login} from "../../connect";

export default async function Database(_, { auth, databaseName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;

        const databaseResponse = await fetch(`${baseUrl}/api/databases/${databaseName}`, {
            headers: headers,
            credentials: 'include'
        });

        if (databaseResponse.status !== 200) {
            throw new Error('Failed to fetch databases');
        }

        const databaseData = await databaseResponse.json();
        return databaseData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
