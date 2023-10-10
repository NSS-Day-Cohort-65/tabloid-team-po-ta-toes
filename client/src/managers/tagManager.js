const _apiUrl = "/api/tag"

export const getAllTags = () => {
    return fetch(`${_apiUrl}`).then(res => res.json());
}

export const deleteTag = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
  }