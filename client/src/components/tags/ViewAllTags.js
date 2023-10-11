import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteTag, editTag, getAllTags } from "../../managers/tagManager";
import { Button, Table } from "reactstrap";

export const ViewAllTags = () => {


    const [tags, setTags] = useState([]);
    const [editingTagId, setEditingTagId] = useState(null)
    const [editedTagName, setEditedTagName] = useState("")

    useEffect(() => {
        getAllTags().then(setTags)
    },[])

    console.log(tags)

    const handleDelete = (e, tagId) => {
        e.preventDefault();
        deleteTag(tagId)
            .then(() => getAllTags().then(setTags))
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        editTag(id, editedTagName)
        .then(() => getAllTags().then(setTags))
        setEditingTagId(null)
    }

    const handleEditButton = (e, id, name) => {
        e.preventDefault();
        setEditingTagId(id);
        setEditedTagName(name)
    }

    const handleCancelButton = (e) => {
        e.preventDefault();
        setEditingTagId(null);
    }


    return (
        <Table>
            <thead>

                <Link to="/tags/create">Create New Tag</Link>
                <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>

            </tr>
            </thead>
            <tbody>
                {tags.map(t => <tr><td key={t.id}>{t.id}</td>
                <td>{editingTagId === t.id ? 
                <input
                type="text"
                value={editedTagName}
                onChange={(e) => setEditedTagName(e.target.value)}
                />
                :
                (
                t.name)}
                </td>
                <td>
                    {editingTagId === t.id ? (
                        <>
                            <Button className="btn btn-success" onClick={(e) => handleEditSubmit(e, t.id)}>Submit</Button>
                            <Button className="btn btn-danger" onClick={handleCancelButton}>Cancel</Button>
                        </>
                    ) : (
                        <Button onClick={(e) => handleEditButton(e, t.id, t.name)} className="btn btn-primary">Edit Tag</Button>
                    )}
                </td>
                <td>
                    <Button onClick={(e) => handleDelete(e, t.id)}>Delete</Button>
                </td>

                </tr>)}
            </tbody>
        </Table>
    )

}