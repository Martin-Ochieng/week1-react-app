import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/slices/formSlice";

const PostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId] = useState(1); // Static userId, could be dynamic

    // Get status and error from Redux store to show loading/error states
    const { status, error } = useSelector((state) => state.form);

    // Handle form submit to add post
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title,
            body,
            userId,
        };

        // Dispatch the addPost action to send the POST request
        dispatch(addPost(newPost));

        // Reset form fields after submission
        setTitle("");
        setBody("");
    };

    return (
        <div>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Adding..." : "Add Post"}
                </button>
            </form>

            {status === "failed" && <p>Error: {error}</p>}
        </div>
    );
};

export default PostForm;
