import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteTag, getAllTags } from "../../managers/tagManager";
import { Button, Table } from "reactstrap";

export const ViewAllTags = () => {


    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setTags)
    },[])

    console.log(tags)

    const handleDelete = (e, tagId) => {
        e.preventDefault();

        deleteTag(tagId)
            .then(() => getAllTags().then(setTags))
    };


    return (
        <Table>
            <thead>

                <Link to="/tags/create">Create New Tag</Link>
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