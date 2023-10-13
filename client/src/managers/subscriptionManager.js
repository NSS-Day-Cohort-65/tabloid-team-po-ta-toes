const _apiUrl = "/api/subscription";

export const createSubscription = (newSubscription) => {
    return fetch(`${_apiUrl}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubscription)
    })
};

export const endSubscription = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
};

export const getActiveUserSubscriptions = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};