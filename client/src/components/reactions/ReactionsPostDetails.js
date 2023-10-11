import './ReactionsPostDetails.css';

export const ReactionsPostDetails = ({ post }) => {
  return (
    <>
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
                >
                  <img
                    src={prd.imageLocation}
                    className="reaction-image"
                    alt=""
                  />
                  <p className="reaction-count">{prd.count}</p>
                </div>
              ) : (
                <div
                  key={index}
                  className="reaction-container"
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
