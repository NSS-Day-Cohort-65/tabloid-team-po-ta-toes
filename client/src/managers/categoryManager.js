const _apiUrl = "/api/category";

export const getCategories = () => {
   return fetch(_apiUrl).then((res) => res.json()); 
};

export const createCategory = (category) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
};

export const getCategoryById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const updateCategory = (category) => {
    return fetch(`${_apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
}

export const deleteCategory = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
};