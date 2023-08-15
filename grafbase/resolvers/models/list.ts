import {login} from "../../connect";

export default async function ProjectModels(_, { projectName }, { request }) {
    try {
        //const {headers} = request;
        //let credentials = headers['authorization'].split(';');
        //const auth = {
        //    email: credentials[0],
        //    password: credentials[1]
        //}
        const cookies = await login(auth);
        const baseUrl = process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/models`;

        const modelsResponse = await fetch(url, {
            headers: cookies,
            credentials: 'include'
        });

        if (modelsResponse.status !== 200) {
            throw new Error('Failed to fetch models');
        }

        const models = await modelsResponse.json();
        return models;
    } catch (error) {
        console.error(error);
        return [error];
    }
}

