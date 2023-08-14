
import {login} from "../../connect";

export default async function ProjectModels(_, { input, projectName }) {
    try {
        const headers = await login(input);
        const baseUrl = input.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/models`;

        const modelsResponse = await fetch(url, {
            headers: headers,
            credentials: 'include'
        });

        if (modelsResponse.status !== 200) {
            throw new Error('Failed to fetch models');
        }

        const models = await modelsResponse.json();
        console.log(models[0]);
        return models;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
