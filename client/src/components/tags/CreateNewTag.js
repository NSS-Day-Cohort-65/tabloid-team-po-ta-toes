import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, FormGroup, Input, Label } from "reactstrap"
import { addATag } from "../../managers/tagManager"

export const CreateNewTag = () => {

    const [name, setTagName] = useState(null) 
    const [errors, setErrors] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTag = {
            name
        }

        addATag(newTag).then((res) => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                navigate ("/tags")
            }
        })
    }



return (
    <>
    <h2>Create New Tag!</h2>
    <Form>
        <FormGroup>
            <Label>Tag Name</Label>
            <Input
            type="text"
            label="Name of Tag"
            htmlFor="tag"
            placeholder="Name of Tag"
            value={name}
            onChange={(e) => setTagName(e.target.value)}
            />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
    </Form>
    </>
)


}