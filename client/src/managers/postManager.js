const _apiUrl = '/api/post';

export const fetchAllPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSinglePost = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
