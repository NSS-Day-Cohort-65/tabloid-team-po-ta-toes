import { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from 'axios';

export const ProfilePicUpload = ({ setImageLocation }) => {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'unsigned');
    await axios
      .post('https://api.cloudinary.com/v1_1/dfanwgskl/image/upload', formData)
      .then((response) => {
        setImageLocation(response.data['secure_url'])
      });
  };

  return (
    <>
      <Label>Upload a profile picture:</Label>
      <Input
        type="file"
        onChange={handleUpload}
      />
    </>
  );
};
