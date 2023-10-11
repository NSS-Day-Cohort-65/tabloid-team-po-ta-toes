import { useEffect, useState } from 'react';
import { deletePost, fetchMyPosts } from '../../managers/postManager.js';
import { Button, Modal, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function MyPosts ({ loggedInUser }) {
    const [posts, setPosts] = useState();
    const [modal, setModal] = useState(false);
    const [postId, setPostId] = useState(0);

    const navigate = useNavigate();

    const getMyPosts = () => {
      fetchMyPosts(loggedInUser.id).then(setPosts);
    };

    const toggle = () => {
      setModal(!modal);
    };

    const handleDelete = (e, id) => {
      e.preventDefault();

      deletePost(id)
        .then(() => getMyPosts())
    };
  
    useEffect(() => {
      getMyPosts();
    }, []);
  
    if (!posts){
      return null;
    }
  
    return (
      <>
        <div className="container">
          <h2>My Posts</h2>
          <Table>
            <thead>
              <th>Title</th>
              <th>Category</th>
              <th></th>
            </thead>
            <tbody>
              {posts.map((p, index) => (
                <tr key={index}>
                  <td>{p.title}</td>
                  <td>{p.category.name}</td>
                  <td>
                    <Button onClick={() => navigate(`/posts/${p.id}`)}>View Post</Button>
                  </td>
                  <td>
                    <Button color="danger" onClick={() => {
                      toggle() 
                      setPostId(p.id)
                      }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => navigate("new")}>Create New Post</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Are you sure you want to delete this Post?</ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={(e) => {
                toggle()
                handleDelete(e, postId)
              }}>
                Confirm Deletion
              </Button>{' '}
              <Button color="primary" onClick={() => {
                toggle()
                setPostId(0)
              }}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  
}