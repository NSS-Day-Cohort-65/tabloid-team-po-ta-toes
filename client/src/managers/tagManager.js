const _apiUrl = "/api/tag"

export const getAllTags = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}

export const addATag = (newTag) => {
    return fetch(`${_apiUrl}`, {
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(newTag)
}).then(res => res.json())
};