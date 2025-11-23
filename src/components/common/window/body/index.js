import React, { forwardRef, memo } from "react";
import styled, { css } from "styled-components";
import ScrollbarContainer from "../../../../styles/ScrollbarContainer";

const StyledWindowBody = styled((ScrollbarContainer))`
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: overlay;
    box-sizing: border-box;

    --generic-border-color: ${({ theme }) =>
        theme.darkTheme ? `#1a1a1a` : `#333333`};

    background: ${({ theme }) =>
        theme.darkTheme 
            ? `linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)` 
            : `#1a1a1a`};
    
    border: ${({ theme, isFocused }) =>
        isFocused && theme.barsAndBorders
            ? `2px solid ${theme.windowsColor}`
            : css`2px solid var(--generic-border-color)`};
    
    border-top: none;
    
    box-shadow: ${({ isFocused, theme }) =>
        isFocused && theme.barsAndBorders
            ? `inset 0 0 20px rgba(0, 255, 65, 0.05),
               0 8px 32px rgba(0, 0, 0, 0.5),
               0 0 0 1px rgba(0, 255, 65, 0.1)`
            : `inset 0 0 20px rgba(0, 0, 0, 0.3),
               0 4px 20px rgba(0, 0, 0, 0.4)`};
`;

const WindowBody = memo(
    forwardRef((props, ref) => {
        const { children, style, isFocused } = props;
        return (
            <StyledWindowBody
                ref={ref}
                className="no-drag windows-section"
                style={style}
                isFocused={isFocused}
            >
                {children}
            </StyledWindowBody>
        );
    })
);

export default WindowBody;
