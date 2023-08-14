import {login} from "../../connect";

export default async function Project(_, { auth, name }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;

        const projectsResponse = await fetch(`${baseUrl}/api/projects/${name}`, {
            headers: headers,
            credentials: 'include'
        });

        if (projectsResponse.status !== 200) {
            throw new Error('Failed to fetch projects');
        }

        const projectsData = await projectsResponse.json();
        return projectsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
