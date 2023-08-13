import {login} from "../../connect";

export default async function Databases(_, { input }) {
    try {
        const headers = await login(input);
        const baseUrl = input.host || process.env.BASE_URL;

        const databasesResponse = await fetch(`${baseUrl}/api/databases`, {
            headers: headers,
            credentials: 'include'
        });

        if (databasesResponse.status !== 200) {
            throw new Error('Failed to fetch databases');
        }

        const databasesData = await databasesResponse.json();
        return databasesData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
