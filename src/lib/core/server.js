
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

export const serverFetch = async (path) => {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`serverFetch failed: ${res.status} ${res.statusText} - ${text}`);
    }

    return res.json();
}

export const serverMutation = async (path, data) => {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`serverMutation failed: ${res.status} ${res.statusText} - ${text}`);
    }

    return res.json();
};