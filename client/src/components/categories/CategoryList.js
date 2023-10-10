import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categoryManager.js";
import { Button, Spinner, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const getAllCategories = () => {
        getCategories().then(setCategories);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    if (!categories) {
        return <Spinner />;
    }

    return (
        <>
            <div className="container">
                <h2>All Categories</h2>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {categories.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                            </tr>
                        ))}
                        <td>
                            <Button onClick={() => {navigate("/categories/create")}}>Create Category</Button>
                        </td>
                    </tbody>
                </Table>
            </div>
        </>
    );
}