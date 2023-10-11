import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../managers/categoryManager.js";
import { Button, FormGroup, Input, Form, Label, Spinner } from "reactstrap";

export default function EditCategoryForm() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(id).then(setCategory);
  }, []);

  const clone = structuredClone(category)
  const setName = (e) => {
    e.preventDefault();
    clone.name = e.target.value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCategory(clone).then(() => {
      navigate("/categories");
    });
  }

  if (!category) {
    return <Spinner />;
  };

  return (
    <>
      <h2>Choose a new name for the category:</h2>
      <Form>
        <FormGroup>
          <Label className="mx-2">Name</Label>
          <Input
            type="text"
            className="mx-2"
            placeholder={category.name}
            onChange={setName}
          />
        </FormGroup>
        <Button onClick={handleSubmit} color="success" className="mx-2">
          Save
        </Button>
        <Button onClick={() => {navigate(`/categories`)}} color="danger">
          Cancel
        </Button>
      </Form>
    </>
  );

}