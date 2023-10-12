const _apiUrl = '/api/postreaction';

export const fetchCreateNewPostReaction = (newPostReaction) => {
  return fetch(_apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPostReaction),
  }).then((res) => res.json());
};

export const fetchDeletePostReaction = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: 'DELETE',
  });
};
