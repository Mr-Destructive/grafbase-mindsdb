import {login} from "../../connect";

export default async function ModelDelete(_, { auth, projectName, modelName }) {
    try {
        const headers = await login(auth);
        const baseUrl = auth.host || process.env.BASE_URL;
        modelName = modelName.toLowerCase();
        const url = `${baseUrl}/api/projects/${projectName}/models/${modelName}`;

        const modelsResponse = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include'
        });
        console.log(await modelsResponse.text());

        if (modelsResponse.status !== 204) {
            throw new Error('Failed to delete model');
        }
        const modelsData = `Model ${modelName} deleted successfully`;
        return modelsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
