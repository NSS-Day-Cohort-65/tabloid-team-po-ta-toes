import { useEffect, useState } from 'react';
import { fetchMyPosts } from '../../managers/postManager.js';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function MyPosts ({ loggedInUser }) {
    const [posts, setPosts] = useState();
    const navigate = useNavigate()

    const getMyPosts = () => {
      fetchMyPosts(loggedInUser.id).then(setPosts);
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
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => navigate("new")}>Create New Post</Button>
        </div>
      </>
    );
  
}