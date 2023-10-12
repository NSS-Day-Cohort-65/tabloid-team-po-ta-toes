const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const deactivateUser = (id) => {
  return fetch(_apiUrl + `/deactivate/${id}`, {
    method: "POST",
  });
};

export const reactivateUser = (id) => {
  return fetch(_apiUrl + `/activate/${id}`, {
    method: "POST",
  });
};
