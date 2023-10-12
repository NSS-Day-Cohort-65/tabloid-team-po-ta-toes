const _apiUrl = '/api/post';

export const fetchAllPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchAllPostsForAdmin = () => {
  return fetch(_apiUrl + "/admin").then((res) => res.json());
};

export const fetchSinglePost = (id, loggedInUserId) => {
  return fetch(`${_apiUrl}/${id}?userId=${loggedInUserId}`).then((res) =>
    res.json()
  );
}

export const fetchMyPosts = (userId) => {
  return fetch(`${_apiUrl}/my-posts/${userId}`).then((res) => res.json());
};

export const fetchCreateNewPost = (post) => {
  return fetch(`${_apiUrl}/my-posts`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(post)
  }).then(res => res.json())
}

export const fetchEditPost = (id, post) => {
  return fetch(`${_apiUrl}/my-posts/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(post)
  })
}

export const deletePost = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE"
  })
};

export const fetchPostsByTag = (tagId) => {
  return fetch(`${_apiUrl}/filter?tagId=${tagId}`).then(res => res.json())
}
export const approvePost = (id) => {
  return fetch(`${_apiUrl}/approve/${id}`, {
    method: "POST"
  })
}

export const unapprovePost = (id) => {
  return fetch(`${_apiUrl}/unapprove/${id}`, {
    method: "POST"
  })
}
