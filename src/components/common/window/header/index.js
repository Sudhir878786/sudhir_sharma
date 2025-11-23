import React, { forwardRef, memo, useContext } from "react";
import styled, { ThemeContext, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

export const WINDOW_HEADER_HEIGHT = 34;

const StyledWindowHeader = styled.div`
    height: ${WINDOW_HEADER_HEIGHT}px;
    width: 100%;
    --generic-bar-color: ${({ theme }) =>
        theme.darkTheme ? `#0a0a0a` : `#1a1a1a`};

    background: ${({ theme, isFocused }) =>
        isFocused && theme.barsAndBorders
            ? `linear-gradient(135deg, ${theme.windowsColor}dd, ${theme.windowsColor}88)`
            : css`linear-gradient(135deg, #0a0a0a, #1a1a1a)`};
    
    border-bottom: ${({ isFocused }) =>
        isFocused
            ? `2px solid #00ff41`
            : `2px solid #333333`};
    
    box-shadow: ${({ isFocused }) =>
        isFocused
            ? `0 2px 15px rgba(0, 255, 65, 0.3), inset 0 1px 0 rgba(0, 255, 65, 0.1)`
            : `0 2px 8px rgba(0, 0, 0, 0.4)`};

    display: flex;
    justify-content: flex-end;
    user-select: none;
    position: relative;
    z-index: 1000;
    
    &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${({ isFocused }) =>
            isFocused
                ? `radial-gradient(circle, #00ff41, #00cc33)`
                : `#555555`};
        box-shadow: ${({ isFocused }) =>
            isFocused
                ? `0 0 8px #00ff41, 0 0 12px rgba(0, 255, 65, 0.5)`
                : `none`};
    }
`;

const StyledWindowOptions = styled.div`
    height: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 1001;
`;

const StyledWindowOption = styled.button`
    width: 40px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ isClose }) => isClose ? '#ff073a' : '#00ff41'};
    border: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    position: relative;
    font-weight: 600;
    z-index: 1002;

    :hover {
        background-color: ${({ hoverBackground }) => hoverBackground};
        color: ${({ isClose }) => isClose ? '#ffffff' : '#00ff41'};
        transform: scale(1.1);
        box-shadow: ${({ isClose }) => 
            isClose 
                ? `0 0 15px rgba(255, 7, 58, 0.5)` 
                : `0 0 15px rgba(0, 255, 65, 0.3)`};
    }

    &:focus {
        outline: none;
        border: none;
        background-color: ${({ hoverBackground }) => hoverBackground};
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const WindowHeader = memo(
    forwardRef((props, ref) => {
        const themeContext = useContext(ThemeContext);

        const hoverBackgroundOption = !themeContext.barsAndBorders
            ? `${themeContext.windowsColor}40`
            : "rgba(0, 255, 65, 0.15)";

        const { onMinimize, onMaximize, onClose, isFocused } = props;
        return (
            <StyledWindowHeader
                ref={ref}
                onDoubleClick={onMaximize}
                isFocused={isFocused}
            >
                <StyledWindowOptions>
                    <StyledWindowOption
                        className="no-drag"
                        id="minimize-window"
                        onClick={onMinimize}
                        fontSize="28px"
                        hoverBackground={hoverBackgroundOption}
                        isClose={false}
                    >
                        −
                    </StyledWindowOption>
                    <StyledWindowOption
                        className="no-drag"
                        id="miximize-window"
                        onClick={onMaximize}
                        fontSize="13px"
                        hoverBackground={hoverBackgroundOption}
                        isClose={false}
                    >
                        <FontAwesomeIcon
                            icon={faSquare}
                            style={{ pointerEvents: "none" }}
                        />
                    </StyledWindowOption>
                    <StyledWindowOption
                        className="no-drag"
                        id="close-window"
                        onClick={onClose}
                        fontSize="16px"
                        hoverBackground="rgba(255, 7, 58, 0.25)"
                        isClose={true}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            style={{ pointerEvents: "none" }}
                        />
                    </StyledWindowOption>
                </StyledWindowOptions>
            </StyledWindowHeader>
        );
    })
);

export default WindowHeader;
