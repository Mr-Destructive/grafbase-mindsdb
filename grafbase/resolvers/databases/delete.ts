import {login} from "../../connect";

export default async function DatabaseDelete(_, {auth, databaseName}) {
    try {
        const headers = await login(auth);
        headers.append('Content-Type', 'application/json');
        const baseUrl = auth.host || process.env.BASE_URL;

        const databaseResponse = await fetch(`${baseUrl}/api/databases/${databaseName}`, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include'
        });

        if (databaseResponse.status !== 204) {
            throw new Error('Failed to delete database');
        }
        const response = `Database ${databaseName} successfully deleted`;
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting database');
        return "Error deleting database"
    }
}
