const _apiUrl = "/api/comment";

export const getCommentsByPostId = (id) => {
    return fetch(`${_apiUrl}/post/${id}`).then((res) => res.json());
};
