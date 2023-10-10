import { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { getCategories } from '../../managers/categoryManager.js';
import { getAllTags } from '../../managers/tagManager.js';

export const CreateNewPost = ({ loggedInUser }) => {
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    imageLocation: '',
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
            <Label htmlFor="imageLocation">Image Url (optional):</Label>
            <Input
              name="imageLocation"
              onChange={handleChange}
              type="url"
            />
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
                checked={!!newPost.tags.find(tag => tag.id === t.id)}
              />
            </FormGroup>
          ))}
        </Form>
      </div>
    </>
  );
};
