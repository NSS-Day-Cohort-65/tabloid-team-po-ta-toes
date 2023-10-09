import { useEffect, useState } from "react"
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllTags } from "../../managers/tagManager";

export const ViewAllTags = () => {


    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setTags)
    },[])

    console.log(tags)

    return (
        <Table>
            <thead>
                <Link to="/tags/create">Create New Tag</Link>
                <tr>
            <th>ID</th>
            <th>Name</th>
            </tr>
            </thead>
            <tbody>
                {tags.map(t => <tr><td key={t.id}>{t.id}</td>
                <td>{t.name}</td>
                </tr>)}
            </tbody>
        </Table>
    )

}