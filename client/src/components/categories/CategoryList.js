import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categoryManager.js";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        getCategories().then(setCategories);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
        <h2>Categories</h2>
        {categories.map((c) => {
            return <p>{c.name}</p>
        })}    
        </>
    );
}