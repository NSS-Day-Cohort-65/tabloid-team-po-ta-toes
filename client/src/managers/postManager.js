const _apiUrl = '/api/post';

export const fetchAllPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchMyPosts = (userId) => {
  return fetch(`${_apiUrl}/my-posts/${userId}`).then((res) => res.json());
};
