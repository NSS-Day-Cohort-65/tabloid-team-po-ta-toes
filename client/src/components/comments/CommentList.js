import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsByPostId } from "../../managers/commentManager.js";
import { Button, Spinner, Table } from "reactstrap";
import { fetchSinglePost } from '../../managers/postManager.js';


export default function CommentList() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const getPostsComments = () => {
        getCommentsByPostId(id).then(setComments);
    };

    const getSinglePost = () => {
        fetchSinglePost(id).then(setPost);
      };    

    useEffect(() => {
        getPostsComments();
        getSinglePost();
    }, []);

    if (!comments || !post) {
        return <Spinner />
    }

    return (
        <>
            <div className="container">
                <h2>{post.title}</h2>
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