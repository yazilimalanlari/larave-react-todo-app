async function request(path, method, data, query = {}) {
    const url = new URL(`api/${path}`, process.env.REACT_APP_API_URL);
    url.search = new url.searchParams.constructor(query);
    
    const options = { 
        method,
        mode: 'cors',
        credentials: 'include'
    };

    if (typeof data !== 'undefined' && data != null) {
        const formData = method === 'POST' ? new FormData() : new url.searchParams.constructor();
        for (const name in data) formData.append(name, data[name]);
        options.body = formData;
    }
    
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
}

async function get(path, query = {}) {
    return request(path, 'GET', null, query);
}

async function post(path, data, query = {}) {
    return request(path, 'POST', data, query);
}

async function put(path, data, query = {}) {
    return request(path, 'PUT', data, query);
}

async function $delete(path, query = {}) {
    return request(path, 'DELETE', query);
}

export default { get, post, put, delete: $delete }