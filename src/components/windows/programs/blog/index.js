import React from "react";
import Window from "../../../common/window";
import CinematicBlog from "../../../CinematicBlog";

function Blog(props) {
    return (
        <Window
            {...props}
            resizable
            title="Blog"
            maxHeight="100vh"
            maxWidth="100vw"
            minHeight="400px"
            minWidth="600px"
        >
            <CinematicBlog />
        </Window>
    );
}

export default Blog;
