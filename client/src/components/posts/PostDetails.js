import { useEffect, useState } from "react";
import { deletePost, fetchSinglePost } from "../../managers/postManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import { Button, Col, Modal, ModalFooter, ModalHeader, Row } from "reactstrap";
import { ReactionsPostDetails } from "../reactions/ReactionsPostDetails.js";
import { createSubscription, endSubscription, getActiveUserSubscriptions } from "../../managers/subscriptionManager.js";

export const PostDetails = ({ loggedInUser }) => {
  const [post, setPost] = useState();
  const [modal, setModal] = useState(false);
  const [activeUserSubscriptions, setActiveUserSubscriptions] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getSinglePost = () => {
    fetchSinglePost(id, loggedInUser.id).then(setPost);
  };

  const getLoggedInUserActiveSubscriptions = () => {
    getActiveUserSubscriptions(loggedInUser.id).then(setActiveUserSubscriptions);
  }

  const checkIsActiveSubscribed = (activeUserSubscriptions) => {
    for (const sub of activeUserSubscriptions) {
      if (sub.subscriberUserProfileId == loggedInUser.id) {
        setIsSubscribed(true);
      }
    }
  }

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    deletePost(post.id).then(() => navigate("/posts"));
  };

  const handleSubscription = (e) => {
    e.preventDefault();

    let newSubscription = {
      subscriberUserProfileId: loggedInUser.id,
      providerUserProfileId: parseInt(e.target.value),
    };

    createSubscription(newSubscription)
    .then(() => getLoggedInUserActiveSubscriptions());
  };

  const handleUnsubscribe = (e) => {
    e.preventDefault();

    let subscriptionIdToDeactivate;

    for (const sub of activeUserSubscriptions) {
      if (sub.subscriberUserProfileId == loggedInUser.id
        && sub.providerUserProfileId == parseInt(e.target.value)) {
        subscriptionIdToDeactivate = sub.id
      }
    };

    setIsSubscribed(false);
    endSubscription(subscriptionIdToDeactivate)
      .then(() => getLoggedInUserActiveSubscriptions());
  };

  useEffect(() => {
    getSinglePost();
    getLoggedInUserActiveSubscriptions();
  }, []);

  useEffect(() => {
    checkIsActiveSubscribed(activeUserSubscriptions);
  }, [activeUserSubscriptions])

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

  if (!post) {
    return null;
  }


  return (
    <>
      <div className="container">
        <h2>{post.title}</h2>
        <h5>By: {post.userProfile.fullName}
          {post.userProfileId === loggedInUser.id
            ? <></> : isSubscribed ? (<Button color='primary' className="mx-2" size="sm" value={post.userProfileId} onClick={handleUnsubscribe}>Unsubscribe</Button>)
              : (<Button color='primary' className="mx-2" size="sm" value={post.userProfileId} onClick={handleSubscription}>Subscribe</Button>)}
        </h5>
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
        </div>
        <ReactionsPostDetails
          post={post}
          getSinglePost={getSinglePost}
          loggedInUser={loggedInUser}
        />

        {post.userProfileId === loggedInUser.id ? (
          <Button
            color="warning"
            onClick={() => {
              navigate(`/my-posts/${post.id}/edit`);
            }}
          >
            Edit
          </Button>
        ) : (
          <></>
        )}
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
          </>
        ) : (
          <></>
        )}
        <Button
          className="mx-2"
          color="primary"
          onClick={() => {
            navigate(`/posts/${id}/comments`);
          }}
        >
          View Comments
        </Button>
        <Link
          className="btn btn-info"
          to={`/posts/${id}/newcomment`}
        >
          Add A Comment
        </Link>
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
