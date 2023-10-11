const _apiUrl = "/api/posttag";

export const getPostTags = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const EditPostTags = async (postId, IdList) => {
  await fetch(`${_apiUrl}?postId=${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(IdList),
  });
};
