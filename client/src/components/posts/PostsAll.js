import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../managers/postManager.js";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FilterPostsByTag } from "../tags/FilterPostsByTag.js";

export const PostsAll = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getAllPosts = () => {
    fetchAllPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (!posts){
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>All Posts</h2>
        <FilterPostsByTag posts={posts} setPosts={setPosts} getAllPosts={getAllPosts} />
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
                  <Button onClick={() => navigate(`${[p.id]}`)}>
                    View Post
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {posts.length === 0 && "No Posts Match!"}
      </div>
    </>
  );
};
