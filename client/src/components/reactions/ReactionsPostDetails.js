import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import './ReactionsPostDetails.css';
import {
  getReactions,
  getUnusedReactions,
} from '../../managers/reactionManager.js';
import {
  fetchCreateNewPostReaction,
  fetchDeletePostReaction,
} from '../../managers/postReactionManager.js';

export const ReactionsPostDetails = ({ post, getSinglePost, loggedInUser }) => {
  const [reactions, setReactions] = useState();
  const [unusedReactions, setUnusedReactions] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getAllReactions = () => {
    getReactions().then(setReactions);
  };

  const getAllUnusedReactions = () => {
    getUnusedReactions(post.id).then(setUnusedReactions);
  };

  useEffect(() => {
    getAllReactions();
    getAllUnusedReactions();
  }, [post]);

  const handleCreatePostReactionFromList = (e) => {
    const newPostReaction = {
      postId: post.id,
      reactionId: e.target.alt,
      userProfileId: loggedInUser.id,
    };

    fetchCreateNewPostReaction(newPostReaction).then(() => getSinglePost());
    toggle();
  };

  const handleCreatePostReactionFromExistingImage = (e) => {
    if (e.target.className === 'reaction-container no-fill') {
      const newPostReaction = {
        postId: post.id,
        reactionId: e.target.id,
        userProfileId: loggedInUser.id,
      };

      fetchCreateNewPostReaction(newPostReaction).then(() => getSinglePost());
    }
  };

  const handleRemovePostReaction = (e) => {
    if (e.target.className === 'reaction-container color-fill') {
      fetchDeletePostReaction(e.target.id).then(() => getSinglePost());
    }
  };

  if (!reactions || !unusedReactions) {
    return <Spinner />;
  }

  return (
    <>
      <Button
        onClick={toggle}
        color="primary"
      >
        Add a reaction!
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Pick a reaction:</ModalHeader>
        <ModalBody>
          <div className="container reactions-select-container">
            {unusedReactions.length !== 0 ? (
              unusedReactions.map((r, index) => (
                <div
                  key={index}
                  className="reaction-container select"
                >
                  <img
                    className="reaction-image select"
                    src={r.imageLocation}
                    alt={r.id}
                    onClick={handleCreatePostReactionFromList}
                  />
                </div>
              ))
            ) : (
              <div className="container reactions-select-container">
                <p>No other reactions available for this post!</p>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
      <div className="container">
        <h5>Reactions:</h5>
        {post.postReactionDTOs.length < 1 ? (
          <div className="reactions-all-container">
            <p>No Reactions Yet!</p>
          </div>
        ) : (
          <div className="reactions-all-container">
            {post.postReactionDTOs.map((prd, index) =>
              prd.reactedByCurrentUser ? (
                <div
                  key={index}
                  className="reaction-container color-fill"
                  id={prd.reaction.id}
                  onClick={handleRemovePostReaction}
                >
                  <img
                    src={prd.imageLocation}
                    className="reaction-image"
                  />
                  <p className="reaction-count">{prd.count}</p>
                </div>
              ) : (
                <div
                  key={index}
                  className="reaction-container no-fill"
                  id={prd.reaction.id}
                  onClick={handleCreatePostReactionFromExistingImage}
                >
                  <img
                    src={prd.imageLocation}
                    className="reaction-image"
                    alt=""
                  />
                  <p className="reaction-count">{prd.count}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};
