import { useEffect, useState } from "react";
import { deletePost, fetchSinglePost } from "../../managers/postManager.js";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getAllTags } from "../../managers/tagManager.js";
import {
  EditPostTags,
  createPostTag,
  getPostTags,
} from "../../managers/postTagManager.js";

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState();
  const [modal, setModal] = useState(false);
  const [tagList, setTagList] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewTags, setViewTags] = useState(false);
  const [postTagList, setPostTagList] = useState();
  const [selectedTags, setSelectedTags] = useState([]);

  const getSinglePost = () => {
    fetchSinglePost(id).then(setPost);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deletePost(post.id).then(() => navigate("/posts"));
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

  const readTimeEstimator = (text) => {
    const AvgWPM = 265;
    const textWordCount = text.split(" ").length;
    const estimatedTime = Math.ceil(textWordCount / AvgWPM);

    if (estimatedTime === 1) {
      return "1 min";
    } else {
      return `${estimatedTime} mins`;
    }
  };

  if (!post || !tagList) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>{post.title}</h2>
        <h5>By: {post.userProfile.fullName}</h5>
        {post.publishDateTime === null ? (
          <h6>Not yet published</h6>
        ) : (
          <h6>{dateFormatter(post.publishDateTime)}</h6>
        )}
        <p>
          <i>Estimated reading time: {readTimeEstimator(post.content)}</i>
        </p>
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
        {post.userProfileId === loggedInUser.id ? (
          <>
            <Button
              color="danger"
              onClick={() => {
                toggle();
              }}
            >
              Delete
            </Button>
            <Button
              className="mx-2"
              color="primary"
              onClick={() => {
                navigate(`/posts/${id}/comments`);
              }}
            >
              View Comments
            </Button>
          </>
        ) : (
          <></>
        )}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Are you sure you want to delete this Post?
          </ModalHeader>
          <ModalFooter>
            <Button
              color="danger"
              onClick={(e) => {
                toggle();
                handleDelete(e);
              }}
            >
              Confirm Deletion
            </Button>{" "}
            <Button
              color="primary"
              onClick={() => {
                toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
