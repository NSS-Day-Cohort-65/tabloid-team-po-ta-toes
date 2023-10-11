import { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormGroup, Input, Label } from "reactstrap";
import { createComment } from "../../managers/commentManager";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateComment({loggedInUser}) {

    const {id} = useParams();
    const [newCommentText, setNewCommentText] = useState("");
    const [newCommentSubject, setNewCommentSubject] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createComment({
            Subject: newCommentSubject,
            Content: newCommentText,
            PostId: id,
            UserProfileId: loggedInUser.id
        }).then(navigate(`/posts/${id}/comments`))
    }

    return (
        <>
        <h2 className="container">Create a Comment!</h2>
        <Form onSubmit={handleSubmit} className="container">
            <FormGroup>
                <Label>Subject</Label>
                <Input
                type="text"
                label="Subject"
                placeholder="Enter subject here"
                value={newCommentSubject}
                onChange={(e) => setNewCommentSubject(e.target.value)}>
                </Input>
                <Label>Comment</Label>
                <Input
                type="textarea"
                placeholder="Enter content here"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                >
                </Input>
            </FormGroup>
            <Button className="btn btn-success">Submit</Button>
        </Form>
        </>
    )

}
