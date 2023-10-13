import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../managers/userProfileManager';
import { ProfilePicUpdate } from '../imageUpload/ProfilePicUpdate.js';
import "./UserProfiles.css"

export default function UserProfileDetails({ loggedInUser }) {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  const getProfileFunc = () => {
    getProfile(id).then(setUserProfile);
  };

  useEffect(() => {
    getProfileFunc();
  }, [id]);

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

  if (!userProfile) {
    return null;
  }
  return (
    <>
      <img
        className="profile-pic"
        src={userProfile.imageLocation}
        alt={userProfile.firstName}
      />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <p>Email: {userProfile.email}</p>
      <p>Creation Date: {dateFormatter(userProfile.createDateTime)}</p>
      <p>
        User Profile Type(s):{' '}
        {userProfile.roles.length
          ? userProfile.roles.map((r) => r + ' ')
          : 'Default'}
      </p>
      {
        loggedInUser.id === userProfile.id ?
        <ProfilePicUpdate getProfileFunc={getProfileFunc} />
        :
        ""

      }
    </>
  );
}
