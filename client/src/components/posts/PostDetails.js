import { useEffect, useState } from "react";
import { fetchSinglePost } from "../../managers/postManager.js";
import { useParams } from "react-router-dom";
import "./PostDetails.css";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { getAllTags } from "../../managers/tagManager.js";
import {
  EditPostTags,
  createPostTag,
  getPostTags,
} from "../../managers/postTagManager.js";

export const PostDetails = () => {
  const [post, setPost] = useState();
  const [tagList, setTagList] = useState();
  const { id } = useParams();
  const [viewTags, setViewTags] = useState(false);
  const [postTagList, setPostTagList] = useState();
  const [selectedTags, setSelectedTags] = useState([]);

  const getSinglePost = () => {
    fetchSinglePost(id).then(setPost);
  };

  useEffect(() => {
    getSinglePost();
    getAllTags().then(setTagList);
    getPostTags().then(setPostTagList);
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

  const handleSelect = (target) => {
    if (
      target.checked &&
      !post.postTags.some((pt) => pt.tagId === parseInt(target.name))
    ) {
      const matchingTag = tagList.find((t) => t.id === parseInt(target.name));
      const clone = structuredClone(post);
      clone.postTags.push({
        postId: parseInt(id),
        tagId: parseInt(target.name),
        tag: matchingTag,
      });
      setPost(clone);
    } else {
      let clone = structuredClone(post);
      clone.postTags = clone.postTags.filter(
        (pt) => pt.tagId !== parseInt(target.name)
      );
      setPost(clone);
    }
  };

  const handleSave = (id, postTags) => {
    EditPostTags(id, postTags).then(() => {
      getSinglePost();
    });
  };

  if (!post || !tagList) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>{post.title}</h2>
        <h5>By: {post.userProfile?.fullName}</h5>
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
          <div className="inline-divs">
            {post.postTags.map((pt) => (
              <div key={`${pt.postId}--${pt.tagId}`}>🏷️{pt.tag.name}</div>
            ))}
          </div>
        </div>
        <div className="tags--open-close">
          <Button color="info" onClick={() => setViewTags(!viewTags)}>
            Manage Tags
          </Button>
          <div className={`tags--select ${viewTags ? null : "hide"}`}>
            {tagList.map((t) => (
              <FormGroup key={`tag--${t.id}`} check>
                <Input
                  type="checkbox"
                  name={t.id}
                  checked={
                    post.postTags?.some((pt) => pt.tagId === t.id)
                      ? true
                      : false
                  }
                  onChange={(e) => handleSelect(e.target)}
                />
                <Label check>{t.name}</Label>
              </FormGroup>
            ))}
            <Button
              color="success"
              onClick={() => handleSave(id, post.postTags)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
