
export async function login(input) {
    let cookies = '';
    const baseUrl = input.host || process.env.BASE_URL;
    try {
        const response = await axios.post(`${baseUrl}/cloud/login`, {
            input.email,
            input.password
        });
        cookies = response.headers['set-cookie'].join('; ');
        const authToken = response.data.token;
        return cookies;
    } catch (error) {
        console.error(error);
    }
}

