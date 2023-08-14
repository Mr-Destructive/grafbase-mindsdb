import {login} from "../../connect";

export default async function ViewDelete(_, { auth, projectName, viewName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;
        viewName = viewName.toLowerCase();
        const url = `${baseUrl}/api/projects/${projectName}/views/${viewName}`;

        const viewsResponse = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include'
        });
        console.log(await viewsResponse.text());

        if (viewsResponse.status !== 204) {
            throw new Error('Failed to delete view');
        }
        const viewsData = `View ${viewName} deleted successfully`;
        return viewsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
