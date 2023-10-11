import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createNewReaction, getReactions } from "../../managers/reactionManager";

export const CreateReaction = () => {

    
    const [reactions, setReactions] = useState([]);
    const [newReactionName, setNewReactionName] = useState("");
    const [newReactionImageLocation, setNewReactionImageLocation] = useState("")

    useEffect(() => {
        getReactions().then(setReactions())
    },[])

    console.log(reactions)


    const handleSubmit = (e) => {
        e.preventDefault();
        createNewReaction({
            Name: newReactionName,
            ImageLocation: newReactionImageLocation
        })
    }

    return (
        <>
        <h2 className="container">Create a Reaction!</h2>
        <Form onSubmit={handleSubmit} className="container">
            <FormGroup>
            <Label>Name of Reaction</Label>
            <Input
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) => setNewReactionName(e.target.value)}>
            </Input>
            <Label>Image URL for reaction</Label>
            <Input
            type="text"
            name="image"
            placeholder="https://rickastley.co.uk/images/47"
            onChange={(e) => setNewReactionImageLocation(e.target.value)}>
            </Input>
            </FormGroup>
            <Button className="btn btn-success">Submit</Button>
        </Form>
        </>
    )

}