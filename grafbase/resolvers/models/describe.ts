import {login} from "../../connect";

export default async function ModelDescribe(_, { input, projectName, modelName }) {
    try {
        const headers = await login(input);
        const baseUrl = input.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/models/${modelName}/describe`;

        const modelsResponse = await fetch(url, {
            headers: headers,
            credentials: 'include'
        });

        if (modelsResponse.status !== 200) {
            throw new Error('Failed to fetch models');
        }

        const modelsData = await modelsResponse.json();
        return modelsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
