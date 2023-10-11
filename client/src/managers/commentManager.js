const _apiUrl = "/api/comment";


export const getCommentsByPostId = (id) => {
    return fetch(`${_apiUrl}/post/${id}`).then((res) => res.json());
};

export const createComment = (newComment) => {
    return fetch(`${_apiUrl}/`, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newComment)
    })
}

export const deleteComment = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
  };
  