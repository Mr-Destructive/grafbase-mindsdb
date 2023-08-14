import {login} from "../../connect";

export default async function Tables(_, { auth, databaseName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;

        const tablesResponse = await fetch(`${baseUrl}/api/databases/${databaseName}/tables`, {
            headers: headers,
            credentials: 'include'
        });

        if (tablesResponse.status !== 200) {
            throw new Error('Failed to fetch tables');
        }

        const tablesData = await tablesResponse.json();
        return tablesData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
