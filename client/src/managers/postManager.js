const _apiUrl = '/api/post';

export const fetchAllPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
