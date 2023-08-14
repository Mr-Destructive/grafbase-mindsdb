import {login} from "../../connect";

export default async function TableDelete(_, { auth, databaseName, tableName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;
        tableName = tableName.toLowerCase();
        const url = `${baseUrl}/api/databases/${databaseName}/tables/${tableName}`;

        const tablesResponse = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include'
        });
        console.log(await tablesResponse.text());

        if (tablesResponse.status !== 204) {
            throw new Error('Failed to delete table');
        }
        const tablesData = `Table ${tableName} deleted successfully`;
        return tablesData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
