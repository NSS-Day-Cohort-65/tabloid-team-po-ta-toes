import { useEffect, useState } from 'react';
import { fetchMyPosts } from '../../managers/postManager.js';
import { Button, Table } from 'reactstrap';

export default function MyPosts ({ loggedInUser }) {
    const [posts, setPosts] = useState();

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
          <h2>All Posts</h2>
          <Table>
            <thead>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th></th>
            </thead>
            <tbody>
              {posts.map((p, index) => (
                <tr key={index}>
                  <td>{p.title}</td>
                  <td>{p.userProfile.fullName}</td>
                  <td>{p.category.name}</td>
                  <td>
                    <Button>View Post</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  
}