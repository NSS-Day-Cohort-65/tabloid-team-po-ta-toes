import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../managers/categoryManager.js";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();

    const getAllCategories = () => {
        getCategories().then(setCategories);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();

        deleteCategory(id)
            .then(() => getAllCategories())
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
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <>
                                <tr>
                                    <td key={c.id}>
                                        <td>{c.name}</td>
                                    </td>
                                    <td>
                                        <Button onClick={() => { navigate(`/categories/${c.id}/edit`) }}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button color="danger" onClick={() => {
                                            toggle()
                                            setCategoryId(c.id)
                                        }}>Delete</Button>
                                    </td>
                                </tr>
                            </>
                        ))}
                        <td>
                            <Button onClick={() => { navigate("/categories/create") }}>Create Category</Button>
                        </td>
                    </tbody>
                </Table>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete this Category?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => {
                            toggle()
                            handleDelete(e, categoryId)
                        }}>
                            Confirm Deletion
                        </Button>{' '}
                        <Button color="primary" onClick={() => {
                            toggle()
                            setCategoryId(0)
                        }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}