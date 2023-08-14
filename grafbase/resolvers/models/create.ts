import {login} from "../../connect";

export default async function ModelCreate(_, { auth, projectName, modelData }) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;
        const url = `${baseUrl}/api/projects/${projectName}/models`;
        let parameters = "";
        for (const [key, value] of Object.entries(modelData.parameters)) {
            parameters += `${key} = '${value}', `;
        }
        parameters = parameters.slice(0, -2);
        console.log(parameters);

        const query = `CREATE MODEL ${projectName}.${modelData.name} PREDICT ${modelData.predictColumn} USING ENGINE = '${modelData.engine}', ${parameters};`

        console.log(query);
        const body = JSON.stringify({
            query: query
        })
        const modelsResponse = await fetch(url, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: body
        });

        if (modelsResponse.status !== 201) {
            throw new Error('Failed to create model');
        }
        const modelsData = await modelsResponse.json();
        return modelsData;
    } catch (error) {
        console.error(error);
        return [error];
    }
}
