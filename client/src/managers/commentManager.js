const _apiUrl = "/api/comment";

export const getCommentsByPostId = (id) => {
    return fetch(`${_apiUrl}/post/${id}`).then((res) => res.json());
};

export const deleteComment = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
  };
  