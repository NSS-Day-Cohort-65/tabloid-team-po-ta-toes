import { useEffect, useState } from "react";
import { fetchSinglePost } from "../../managers/postManager.js";
import { useParams } from "react-router-dom";
import "./PostDetails.css";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { getAllTags } from "../../managers/tagManager.js";

export const PostDetails = () => {
  const [post, setPost] = useState();
  const [tagList, setTagList] = useState();
  const { id } = useParams();
  const [viewTags, setViewTags] = useState(false);

  const getSinglePost = () => {
    fetchSinglePost(id).then(setPost);
  };

  useEffect(() => {
    getSinglePost();
    getAllTags().then(setTagList);
  }, []);

  const dateFormatter = (date) => {
    const parsedDate = new Date(date);

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    const formattedDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  if (!post) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>{post.title}</h2>
        <h5>By: {post.userProfile.fullName}</h5>
        <h6>{dateFormatter(post.publishDateTime)}</h6>
        <div className="container">
          <Row>
            <Col className="post-content-col">
              <p>{post.content}</p>
            </Col>
            {post.imageLocation ? (
              <Col className="post-image-col">
                <img className="post-image" src={post.imageLocation} alt="" />
              </Col>
            ) : (
              ""
            )}
          </Row>
        </div>
        <div className="tags--open-close">
          <Button onClick={() => setViewTags(!viewTags)}> Manage Tags</Button>
          <div className={`tags--select ${viewTags ? null : "hide"}`}>
            {tagList.map((t) => (
              <FormGroup key={`tag--${t.id}`} check>
                <Input type="checkbox" name={t.id} />
                <Label check>{t.name}</Label>
              </FormGroup>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
