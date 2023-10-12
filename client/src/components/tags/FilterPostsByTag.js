import { useEffect, useState } from "react"
import { Form, FormGroup } from "reactstrap"
import { getAllTags } from "../../managers/tagManager";
import { fetchAllPosts, fetchPostsByTag } from "../../managers/postManager";

export const FilterPostsByTag = ({posts, setPosts, getAllPosts}) => {

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);


    useEffect(() => {
        getAllTags().then(setTags);
    },[])

    const handleSelect = (e) => {
        const value = parseInt(e.target.value);
        setSelectedTag(value);
        if (value === 0) {
            getAllPosts();
        }
    };

    useEffect(() => {
        if (selectedTag !== null && selectedTag !== 0)
        {
            fetchPostsByTag(selectedTag).then(setPosts);
        } 
    },[selectedTag])

    console.log("selected tag", selectedTag)
    
    console.log(posts)

    if (!posts){
        return null;
    }

    return (
        <>
        <Form>
            <FormGroup>
            <select onChange={handleSelect}>
                <option value="0">Filter Posts By Tag</option>
                {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            </FormGroup>
        </Form>
        </>
    )

}