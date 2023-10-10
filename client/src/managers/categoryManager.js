const apiUrl = "/api/category";

export const getCategories = () => {
   return fetch(apiUrl).then((res) => res.json()); 
};

export const createCategory = (category) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
};

export const getCategoryById = (id) => {
    return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};

export const updateCategory = (category) => {
    return fetch(`${apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
}

export const deleteCategory = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
};