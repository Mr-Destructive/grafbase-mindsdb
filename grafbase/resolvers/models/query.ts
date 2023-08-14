import {login} from "../../connect";

export default async function ModelQuery(_, { auth, query }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${query.projectName}/models/${query.modelName}/predict`;

        const body = JSON.stringify({
            data: query.data
        })
        const modelsResponse = await fetch(url, {
            method: 'POST',
            body: body,
            headers: headers,
            credentials: 'include'
        });

        if (modelsResponse.status !== 200) {
            throw new Error('Failed to query model');
        }
        const modelsData = await modelsResponse.json();
        const resp = modelsData[0];
        return resp;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
