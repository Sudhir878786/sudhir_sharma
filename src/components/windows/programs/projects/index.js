import React from "react";
import Window from "../../../common/window";
import CinematicPortfolio from "../../../CinematicPortfolio";

function Projects(props) {
    return (
        <Window
            {...props}
            resizable
            title="Projects"
            maxHeight="100vh"
            maxWidth="100vw"
            minHeight="400px"
            minWidth="600px"
        >
            <CinematicPortfolio />
        </Window>
    );
}

export default Projects;
