import {login} from "../../connect";

export default async function ProjectViews(_, { auth, projectName }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/views`;

        const viewsResponse = await fetch(url, {
            headers: headers,
            credentials: 'include'
        });

        if (viewsResponse.status !== 200) {
            throw new Error('Failed to fetch views');
        }

        const views = await viewsResponse.json();
        return views;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
