import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../managers/categoryManager.js";
import { Button, FormGroup, Input, Form, Label } from "reactstrap";

export default function NewCategoryForm() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            name,
        };

        createCategory(newCategory).then(() => {
            navigate("/categories");
        });
    };
    return (
        <>
          <h2>Choose a name for the new category:</h2>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </Form>
        </>
      );
    
}