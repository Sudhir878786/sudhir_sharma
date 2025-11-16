import React from "react";
import styled from "styled-components";
import Taskbar from "./taskbar";
import ProgramList from "./programs/ProgramList";
import IconsList from "./icons/IconsList";
import Calendar from "./poppus/calendar";
import { useSelector } from "react-redux";
import BSOD from "./bsod";
import { NAVBAR_HEIGHT } from "../../util/globalConstans";
import Menu from "./poppus/menu";
import NotificationsCenter from "./poppus/notifications/NotificationsCenter";
import WidgetsPanel from "./poppus/widgets/WidgetsPanel";

const StyledWindowsHome = styled.div`
    width: 100%;
    height: 100%;
    background: #1e1e1e;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 50%, rgba(78, 201, 176, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(86, 156, 214, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(220, 220, 170, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(30, 30, 30, 0.95) 100%);
        pointer-events: none;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(78, 201, 176, 0.03) 2px,
                rgba(78, 201, 176, 0.03) 4px
            ),
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(78, 201, 176, 0.03) 2px,
                rgba(78, 201, 176, 0.03) 4px
            );
        opacity: 0.5;
        pointer-events: none;
    }
    
    .windows-section {
        background-color: var(--windows-section-color);
    }
    .windows-text {
        color: var(--windows-text-color);
    }
`;

const StyledBackgroundPattern = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    opacity: 0.08;
    pointer-events: none;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            linear-gradient(45deg, transparent 30%, rgba(78, 201, 176, 0.4) 30%, rgba(78, 201, 176, 0.4) 70%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(86, 156, 214, 0.3) 30%, rgba(86, 156, 214, 0.3) 70%, transparent 70%);
        background-size: 100px 100px;
        animation: patternMove 20s linear infinite;
    }
    
    @keyframes patternMove {
        0% {
            background-position: 0 0, 0 0;
        }
        100% {
            background-position: 100px 100px, -100px -100px;
        }
    }
    
    &::after {
        content: '< DEVELOPER />';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Courier New', monospace;
        font-size: clamp(3rem, 8vw, 8rem);
        font-weight: bold;
        color: rgba(78, 201, 176, 0.15);
        text-shadow: 
            0 0 20px rgba(78, 201, 176, 0.3),
            0 0 40px rgba(78, 201, 176, 0.2);
        letter-spacing: 0.5rem;
        white-space: nowrap;
    }
    
    @media (max-width: 768px) {
        &::after {
            font-size: 2rem;
            letter-spacing: 0.2rem;
        }
    }
`;

const StyledDesktopContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - ${NAVBAR_HEIGHT}px);
`;

const Windows = () => {
    const fatalError = useSelector(({ programs }) => programs.fatalError);

    if (fatalError) {
        return <BSOD />;
    }

    return (
        <StyledWindowsHome>
            <StyledBackgroundPattern />
            <StyledDesktopContainer>
                <IconsList />
                <ProgramList />
                <Menu />
                <Calendar />
                <NotificationsCenter />
                <WidgetsPanel />
            </StyledDesktopContainer>
            <Taskbar />
        </StyledWindowsHome>
    );
};

export default Windows;
