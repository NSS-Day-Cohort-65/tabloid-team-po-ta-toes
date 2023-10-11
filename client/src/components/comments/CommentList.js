import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getCommentsByPostId } from "../../managers/commentManager.js";
import { Button, Modal, ModalFooter, ModalHeader, Spinner, Table } from "reactstrap";
import { fetchSinglePost } from '../../managers/postManager.js';


export default function CommentList({ loggedInUser }) {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState();
    const [modal, setModal] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const navigate = useNavigate();

    const getPostsComments = () => {
        getCommentsByPostId(id).then(setComments);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const getSinglePost = () => {
        fetchSinglePost(id).then(setPost);
    };

    const handleDelete = (e, id) => {
        e.preventDefault();

        deleteComment(id)
            .then(() => getPostsComments())
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
                            <tr key={c.id}>
                                <td>{c.subject}</td>
                                <td>{c.content}</td>
                                <td>{c.userProfile.identityUser.userName}</td>
                                <td>{c.createDateTime}</td>
                                {c.userProfileId === loggedInUser.id 
                                ? (
                                    <td>
                                        <Button color="danger" onClick={() => {
                                            toggle()
                                            setCommentId(c.id)
                                        }}>Delete</Button>
                                    </td>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        ))}
                        <td>
                            <Button color="secondary" onClick={() => { navigate(`/posts/${id}`) }}>Return to Post</Button>
                        </td>
                    </tbody>
                </Table>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Are you sure you want to delete this comment?</ModalHeader>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => {
                            toggle()
                            handleDelete(e, commentId)
                        }}>
                            Confirm Deletion
                        </Button>{' '}
                        <Button color="primary" onClick={() => {
                            toggle()
                            setCommentId(0)
                        }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
};