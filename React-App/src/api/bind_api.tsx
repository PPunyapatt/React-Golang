
export const submit = async (username: string , hash_password: string) => {
    const response = await fetch('http://localhost:8777/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            Username: username,
            Password: hash_password
        })
    });

    return response
};

export const signup = async (username: string , hash_password: string) => {
    const response = await fetch('http://localhost:8777/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            Username: username,
            Password: hash_password
        })
    });

    return response
};

export const test_admin = async () => {
    const rsp = await fetch('http://localhost:8777/admin', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    // const rsp = await fetch('http://localhost:8777/admin')
    return rsp
};
