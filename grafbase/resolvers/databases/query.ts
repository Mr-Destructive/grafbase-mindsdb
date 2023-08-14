import {login} from "../../connect";

export default async function SqlQuery(_, { auth, query  }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const body = JSON.stringify({
            query: query
        })

        const queryResponse = await fetch(`${baseUrl}/api/sql/query`, {
            method: 'POST',
            headers: headers,
            body: body,
            credentials: 'include'
        });

        if (queryResponse.status !== 200) {
            throw new Error('Failed to fetch query');
        }

        const queryData = await queryResponse.json();
        console.log(queryData['column_names'])
        return queryData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
