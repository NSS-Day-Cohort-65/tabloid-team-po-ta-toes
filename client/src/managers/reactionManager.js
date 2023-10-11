const _apiUrl = "/api/reaction"


export const getReactions = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}

export const createNewReaction = (newReaction) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newReaction)
    }).then(res => res.json())
}