import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { getCategories } from '../../managers/categoryManager.js';
import { getAllTags } from '../../managers/tagManager.js';
import { fetchEditPost, fetchSinglePost } from '../../managers/postManager.js';
import { useNavigate, useParams } from 'react-router-dom';
import { PostPicUpdate } from '../imageUpload/PostPicUpdate.js';

export const EditPost = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [postToEdit, setPostToEdit] = useState();

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };
  const getTags = () => {
    getAllTags().then(setTags);
  };
  const getPosts = () => {
    fetchSinglePost(id, loggedInUser.id).then((res) => {
      let convertedPostTags = [];
      for (const t of res.postTags) {
        const tag = {
          id: t.tag.id,
          name: t.tag.name,
        };
        convertedPostTags.push(tag);
      }
      setPostToEdit({
        ...res,
        postTags: convertedPostTags,
      });
    });
  };

  useEffect(() => {
    getAllCategories();
    getTags();
    getPosts();
  }, []);

  const handleChange = (e) => {
    setPostToEdit({
      ...postToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e, tag) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      let newArr = [...postToEdit.postTags, tag];
      setPostToEdit({
        ...postToEdit,
        postTags: newArr,
      });
    } else {
      setPostToEdit({
        ...postToEdit,
        postTags: postToEdit.postTags.filter((t) => t.id !== tag.id),
      });
    }
  };

    const handleSubmit = () => {
      if (
        postToEdit.title &&
        postToEdit.content &&
        postToEdit.postTags.length > 0 &&
        postToEdit.categoryId
      ) {
        let convertedTagsToPostTags = [];
        for (const t of postToEdit.postTags) {
          let newPT = {
            tagId: t.id,
            tag: t,
          };
          convertedTagsToPostTags.push(newPT);
        }
        let postToSubmit = {
          title: postToEdit.title,
          content: postToEdit.content,
          imageLocation: postToEdit.imageLocation,
          categoryId: postToEdit.categoryId,
          postTags: convertedTagsToPostTags,
          userProfileId: loggedInUser.id,
        };
        fetchEditPost(id, postToSubmit).then((res) =>
          navigate(`/posts/${id}`)
        );
      }
    };

  if (!postToEdit || !categories || !tags) {
    return <Spinner />;
  }
  return (
    <>
      <div className="contianer">
        <h2>Edit post:</h2>
        <Form>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              value={postToEdit.title}
              name="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="categoryId">Category:</Label>
            <Input
              value={postToEdit.categoryId}
              name="categoryId"
              type="select"
              onChange={handleChange}
            >
              <option value="null">-select category-</option>
              {categories.map((m, index) => (
                <option
                  key={index}
                  value={m.id}
                >
                  {m.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <PostPicUpdate postToEdit={postToEdit} setPostToEdit={setPostToEdit}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">Content:</Label>
            <Input
              value={postToEdit.content}
              name="content"
              type="textarea"
              rows="5"
              onChange={handleChange}
            />
          </FormGroup>
          <Label>Tags</Label>
          {tags.map((t, index) => (
            <FormGroup
              check
              key={index}
            >
              <Label>{t.name}</Label>
              <Input
                name={t.name}
                type="checkbox"
                value={t.Id}
                onChange={(e) => handleCheck(e, t)}
                checked={!!postToEdit.postTags.find((pt) => pt.id === t.id)}
              />
            </FormGroup>
          ))}
        </Form>
          <Button
              onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate('/my-posts')}
            color="danger"
          >
            Cancel
          </Button>
      </div>
    </>
  );
};
