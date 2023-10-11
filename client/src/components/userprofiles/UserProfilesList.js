import { useEffect, useState } from "react";
import { deactivateUser, getProfiles, reactivateUser } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [userProfileId , setUserProfileId] = useState(0);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleDeactivate = (e) => {
    e.preventDefault();

    deactivateUser(userProfileId)
      .then(() => getUserProfiles())
  };

  const handleReactivate = (e, userId) => {
    e.preventDefault();

    reactivateUser(userId)
      .then(() => getUserProfiles())
  };

  useEffect(() => {
    getUserProfiles();
  }, []);
  return (
    <>
      <p>User Profile List</p>
      {userprofiles.map((p) => (
        <p key={p.id}>
          {p.firstName} {p.lastName} {p.userName}{" "}
          <Link to={`/userprofiles/${p.id}`}>Details</Link>
          {
            p.isActive
            ?<Button color="danger"onClick={() => {
              toggle()
              setUserProfileId(p.id)
            }}>Deactivate</Button>
            :<Button color="success"onClick={(e) => {
              handleReactivate(e, p.id)
            }}>Reactivate</Button>
          }
        </p>
      ))}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Are you sure you want to delete this Category?</ModalHeader>
        <ModalFooter>
            <Button color="danger" onClick={(e) => {
                toggle()
                handleDeactivate(e)
            }}>
                Confirm Deactivation
            </Button>{' '}
            <Button color="primary" onClick={() => {
                toggle()
                setUserProfileId(0)
            }}>
                Cancel
            </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
