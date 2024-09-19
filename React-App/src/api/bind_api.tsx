
export const submit = async (username: string , hash_password: string) => {
    const response = await fetch('/api/user/login', {
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
    const response = await fetch('/api/user/signup', {
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

export const signout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    return response
};

export const test_admin = async () => {
    const rsp = await fetch('/api/admin', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    // const rsp = await fetch('/api/admin')
    return rsp
};

export const mypost = async (id: number) => {
    const rsp = await fetch(`/api/user/mypost/${id}`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    return rsp
};

export const allpost = async () => {
    const rsp = await fetch(`/api/user/allpost`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    return rsp
};

export const getpost = async (id: number) => {
    const rsp = await fetch(`/api/user/getpost/${id}`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    return rsp
}

export const createPost = async (user_id: number , title: string, body: string) => {
    const rsp = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            User_id: user_id,
            Title: title,
            Body: body
        })
    });
    return rsp
};

export const deletePost = async (id: number) => {
    const rsp = await fetch(`/api/user/deletepost/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return rsp
};

export const authCheck = async () => {
    const rsp = await fetch(`/api/user/auth_check`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })
    return rsp
};




