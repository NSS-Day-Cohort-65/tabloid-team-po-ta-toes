import { Input, Label } from 'reactstrap';
import axios from 'axios';

export const PostPicUpload = ({ newPost, setNewPost }) => {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'unsigned');
    await axios
      .post('https://api.cloudinary.com/v1_1/dfanwgskl/image/upload', formData)
      .then((response) => {
        setNewPost({ ...newPost, imageLocation: response.data['secure_url'] });
      });
  };

  return (
    <>
      <Label>Upload a picture for the post : optional:</Label>
      <Input
        type="file"
        onChange={handleUpload}
      />
    </>
  );
};
