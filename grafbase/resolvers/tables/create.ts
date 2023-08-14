import {login} from "../../connect";

export default async function TableCreate(_, { auth, databaseName, tableData }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/databases/${databaseName}/tables`;

        const body = JSON.stringify({
            name: tableData.name,
            replace: tableData.replace,
            select: tableData.select
        })
        const tablesResponse = await fetch(url, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: body
        });

        if (tablesResponse.status !== 201) {
            throw new Error('Failed to create table');
        }
        const tablesData = await tablesResponse.json();
        return tablesData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
