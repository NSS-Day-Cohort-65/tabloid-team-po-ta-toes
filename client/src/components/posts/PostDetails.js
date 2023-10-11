import { useEffect, useState } from 'react';
import { deletePost, fetchSinglePost } from '../../managers/postManager.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PostDetails.css';
import { Button, Col, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap';

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getSinglePost = () => {
    fetchSinglePost(id).then(setPost);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deletePost(post.id)
      .then(() =>navigate("/posts"))
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  const dateFormatter = (date) => {
    const parsedDate = new Date(date);

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    const formattedDate = `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  };

  const readTimeEstimator = (text) => {
    const AvgWPM = 265;
    const textWordCount = text.split(" ").length
    const estimatedTime = Math.ceil(textWordCount / AvgWPM);

    if (estimatedTime === 1)
    {
      return "1 min"
    } else {

      return `${estimatedTime} mins`;
    }
  }

  if (!post) {
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
                <img
                  className="post-image"
                  src={post.imageLocation}
                  alt=""
                />
              </Col>
            ) : (
              ''
            )}
          </Row>
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
            onClick={() => {navigate(`/posts/${id}/comments`)}}
          >
            View Comments
          </Button>
          <Link className="btn btn-info" to={`/posts/${id}/newcomment`}>Add A Comment</Link>
          </>
        ) : (
          <></>
        )}
        <Modal
          isOpen={modal}
          toggle={toggle}
        >
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
            </Button>{' '}
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
