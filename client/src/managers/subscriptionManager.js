const _apiUrl = "/api/subscription";

export const createSubscription = (newSubscription) => {
    return fetch(`${_apiUrl}/`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newSubscription)
    })
}
