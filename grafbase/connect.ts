
export const login = async (input) => {
    try{
        const email = input.email;
        const password = input.password;
        const baseUrl = input.host || process.env.BASE_URL;

        // Login and retrieve cookies
        const loginResponse = await fetch(`${baseUrl}/cloud/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }

        // Extract cookies from login response
        const cookies = loginResponse.headers.get('set-cookie');
        const cookieArray = cookies ? cookies.split(', ') : [];
        const headers = new Headers();
        headers.append('Cookie', cookieArray.join('; '));
        return headers;
    } catch (error) {
        console.error(error);
        return null
    }
}

