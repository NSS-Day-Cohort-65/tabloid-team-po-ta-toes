import { useEffect, useState } from "react"
import { getAllTags } from "../managers/tagManager";
import { Table } from "reactstrap";

export const ViewAllTags = () => {


    const [tags, setTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setTags)
    },[])

    console.log(tags)

    return (
        <Table>
            <thead>
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