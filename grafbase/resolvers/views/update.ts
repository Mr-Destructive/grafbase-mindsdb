import {login} from "../../connect";

export default async function ViewUpdate(_, { auth, projectName, viewData }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const viewName = viewData.name;
        const url = `${baseUrl}/api/projects/${projectName}/views/${viewName}`;

        const body = JSON.stringify({
            name: viewData.name,
            query: viewData.query
        })
        const viewsResponse = await fetch(url, {
            method: 'PUT',
            headers: headers,
            credentials: 'include',
            body: body
        });

        if (viewsResponse.status !== 200) {
            throw new Error('Failed to update view');
        }
        const viewsData = await viewsResponse.json();
        return viewsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
