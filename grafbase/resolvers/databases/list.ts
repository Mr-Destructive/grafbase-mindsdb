import axios from 'axios';

export default async function Databases(_, { input }) {
    try {
        //let baseUrl = process.env.BASE_URL
        //const cookies = await login(input)
        const email = input.email;
        const password = input.password;
        const baseUrl = input.host || process.env.BASE_URL;
        const response = await axios.post(`${baseUrl}/cloud/login`, {
            email,
            password
        });
        const cookies = response.headers['set-cookie'].join('; ');
        const response2 = await axios.get(`${baseUrl}/api/databases`, {
            headers: {
                'Cookie': cookies,
            }
        });
        return response2.data; 
    } catch (error) {
        console.error(error);
        return []
    }
}
