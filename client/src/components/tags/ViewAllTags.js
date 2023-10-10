import { useEffect, useState } from "react"
import { deleteTag, getAllTags } from "../../managers/tagManager";
import { Button, Table } from "reactstrap";

export const ViewAllTags = () => {


    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setTags)
    },[])

    const handleDelete = (e, tagId) => {
        e.preventDefault();

        deleteTag(tagId)
            .then(() => getAllTags().then(setTags))
    };

    return (
        <Table>
            <thead>
                <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            </tr>
            </thead>
            <tbody>
                {tags.map(t => <tr><td key={t.id}>{t.id}</td>
                <td>{t.name}</td>
                <td>
                    <Button onClick={(e) => handleDelete(e, t.id)}>Delete</Button>
                </td>
                </tr>)}
            </tbody>
        </Table>
    )

}