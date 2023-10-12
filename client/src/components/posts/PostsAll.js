import { useEffect, useState } from "react";
import { fetchAllPosts } from "../../managers/postManager.js";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FilterPostsByTag } from "../tags/FilterPostsByTag.js";
import { approvePost, fetchAllPostsForAdmin, unapprovePost } from '../../managers/postManager.js';


export const PostsAll = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  const getAllPosts = () => {
    if (loggedInUser?.roles?.includes("Admin"))
    {
      fetchAllPostsForAdmin().then(setPosts)
    }
    else {
      fetchAllPosts().then(setPosts);
    }
  };

  const handleApprove = (e, postId) => {
    e.preventDefault();

    approvePost(postId)
      .then(() => getAllPosts())
  }
  
  const handleUnapprove = (e, postId) => {
    e.preventDefault();

    unapprovePost(postId)
      .then(() => getAllPosts())
  }

  const showApprovalStatus = (post) => {
    if (post.isApproved === true) {
      return <td>
        <Button color='danger' onClick={(e) => handleUnapprove(e, post.id)}> Unapprove Post</Button>
        </td>
    } else {
      return <td>
      <Button color='primary' onClick={(e) => handleApprove(e, post.id)}> Approve Post</Button>
      </td>
    }
  }

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
                {
                  loggedInUser?.roles?.includes("Admin") 
                  ? showApprovalStatus(p) 
                  :<></>
                }
              </tr>
            ))}
          </tbody>
        </Table>
        {posts.length === 0 && "No Posts Match!"}
      </div>
    </>
  );
};
