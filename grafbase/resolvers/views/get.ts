import {login} from "../../connect";

export default async function View(_, { auth, projectName, viewName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/views/${viewName}`;

        const viewsResponse = await fetch(url, {
            headers: headers,
            credentials: 'include'
        });

        if (viewsResponse.status !== 200) {
            throw new Error('Failed to fetch views');
        }

        const viewsData = await viewsResponse.json();
        return viewsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
