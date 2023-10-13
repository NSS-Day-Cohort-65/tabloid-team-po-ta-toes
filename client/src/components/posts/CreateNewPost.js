import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { getCategories } from '../../managers/categoryManager.js';
import { getAllTags } from '../../managers/tagManager.js';
import { fetchCreateNewPost } from '../../managers/postManager.js';
import { useNavigate } from 'react-router-dom';
import { PostPicUpload } from '../imageUpload/PostPicUpload.js';

export const CreateNewPost = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    imageLocation: null,
    categoryId: null,
    tags: [],
  });

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };
  const getTags = () => {
    getAllTags().then(setTags);
  };

  useEffect(() => {
    getAllCategories();
    getTags();
  }, []);

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e, tag) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      let newArr = [...newPost.tags, tag];
      setNewPost({
        ...newPost,
        tags: newArr,
      });
    } else {
      setNewPost({
        ...newPost,
        tags: newPost.tags.filter((t) => t.id !== tag.id),
      });
    }
  };

  const handleSubmit = () => {
    if (
      newPost.title &&
      newPost.content &&
      newPost.tags.length > 0 &&
      newPost.categoryId
    ) {
      let convertedTagsToPostTags = [];
      for (const t of newPost.tags) {
        let newPT = {
          tagId: t.id,
          tag: t,
        };
        convertedTagsToPostTags.push(newPT);
      }
      let newPostToSubmit = {
        title: newPost.title,
        content: newPost.content,
        imageLocation: newPost.imageLocation,
        categoryId: newPost.categoryId,
        postTags: convertedTagsToPostTags,
        userProfileId: loggedInUser.id,
      };
      fetchCreateNewPost(newPostToSubmit).then((res) =>
        navigate(`/posts/${res.id}`)
      );
    }
  };

  if (!categories || !tags) {
    return <Spinner />;
  }
  return (
    <>
      <div className="contianer">
        <h2>Create a new post:</h2>
        <Form>
          <FormGroup>
            <Label htmlFor="title">Title:</Label>
            <Input
              name="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="categoryId">Category:</Label>
            <Input
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
            <PostPicUpload newPost={newPost} setNewPost={setNewPost} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">Content:</Label>
            <Input
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
                checked={!!newPost.tags.find((tag) => tag.id === t.id)}
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
      </div>
    </>
  );
};
