const _apiUrl = "/api/tag"

export const getAllTags = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}