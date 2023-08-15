import {login} from "../../connect";

export default async function ViewCreate(_, { auth, projectName, viewData }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/views`;

        const body = JSON.stringify({
            view:{
                name: viewData.name,
                query: viewData.query
            }
        })
        const viewsResponse = await fetch(url, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: body
        });

        if (viewsResponse.status !== 201) {
            throw new Error('Failed to create view');
        }
        const viewsData = await viewsResponse.json();
        return viewsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
