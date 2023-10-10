import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/commentManager.js";
import { Button, Spinner, Table } from "reactstrap";

export default function CommentList() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const getPostsComments = () => {
        getCommentsByPostId(id).then(setComments);
    };

    useEffect(() => {
        getPostsComments();
    }, []);

    if (!comments) {
        return <Spinner />
    }

    return (
        <>
            <div className="container">
                <h2>Name of Post</h2>
                <Table>
                    <thead>
                        <th>Subject</th>
                        <th>Content</th>
                        <th>Display Name</th>
                        <th>Comment Date</th>
                    </thead>
                    <tbody>
                        {comments.map((c) => (
                            <>
                                <tr>
                                    <td key={c.id}>
                                        <td>{c.subject}</td>
                                        <td>{c.content}</td>
                                        <td>{c.userProfile.identityUser.userName}</td>
                                        <td>{c.createDateTime}</td>
                                    </td>
                                </tr>
                            </>
                        ))}
                        <td>
                            <Button onClick={() => { navigate(`/posts/${id}`) }}>Return to Post</Button>
                        </td>
                    </tbody>
                </Table>
            </div>
        </>
    )
};