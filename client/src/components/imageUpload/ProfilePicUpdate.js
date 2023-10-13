import { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import { fetchUploadProfilePicture } from '../../managers/userProfileManager.js';

export const ProfilePicUpdate = ({ getProfileFunc }) => {
  const [image, setImage] = useState();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'unsigned');
    await axios
      .post('https://api.cloudinary.com/v1_1/dfanwgskl/image/upload', formData)
      .then((response) => {
        fetchUploadProfilePicture(response.data['secure_url']).then(() =>
          getProfileFunc()
        );
      });
  };

  return (
    <>
    <Label>Upload a new profile picture:</Label>
      <Input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </>
  );
};
