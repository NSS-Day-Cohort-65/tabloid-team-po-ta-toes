const _apiUrl = "/api/comment";

export const getCommentsByPostId = (id) => {
  return fetch(`${_apiUrl}/post/${id}`).then((res) => res.json());
};

export const getSingleComment = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const editComment = async (id, comment) => {
  await fetch(`${_apiUrl}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
};
