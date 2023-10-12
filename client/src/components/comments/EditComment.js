import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import {
  editComment,
  getSingleComment,
} from "../../managers/commentManager.js";

export const EditComment = () => {
  const { id } = useParams();
  const [comment, setcomment] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleComment(id).then(setcomment);
  }, []);

  const handleChange = (target) => {
    const clone = structuredClone(comment);
    clone[target.name] = target.value;
    setcomment(clone);
  };

  const handleSave = () => {
    editComment(id, comment).then(() => {
      navigate(`/posts/${comment.postId}/comments`);
    });
  };

  if (!comment) {
    return null;
  }
  return (
    <div className="container">
      <h2>Edit Comment</h2>
      <Form>
        <FormGroup>
          <Label htmlFor="subject">Subject:</Label>
          <Input
            value={comment.subject}
            name="subject"
            onChange={(e) => handleChange(e.target)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">Content::</Label>
          <Input
            value={comment.content}
            name="content"
            type="textarea"
            rows="8"
            onChange={(e) => handleChange(e.target)}
          />
        </FormGroup>
      </Form>
      <Button
        color="success"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </Button>
      <Button
        color="danger"
        onClick={() => {
          navigate(`/posts/${comment.postId}/comments`);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};
