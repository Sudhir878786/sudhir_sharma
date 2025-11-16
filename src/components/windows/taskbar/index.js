import React, { useLayoutEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGripVertical, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AVAILABLE_ICONS } from "../icons/utils";
import {
    defocusProgram,
    focusProgram,
    toggleMinimizeProgram,
} from "../../../store/slices/programs";
import {
    toggleCalendar,
    toggleWindowsMenu,
} from "../../../store/slices/popups";
import { toggleNotifications } from "../../../store/slices/notifications";
import { toggleWidgets } from "../../../store/slices/widgets";
import { toggleTheme } from "../../../store/slices/theme";
import { shadeColor } from "../../../common/colorCommonFunctions";

const StyledTaskbar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: var(--windows-section-color);
    background-color: ${({ theme }) =>
        theme.startAndTaskbar
            ? shadeColor(theme.windowsColor, -50)
            : css`var(--windows-section-color)`};
    display: flex;
    justify-content: space-between;
    z-index: ${({ maxFocusLevel }) => maxFocusLevel + 1};

    color: ${({ theme }) =>
        theme.startAndTaskbar ? `#f5f5f5` : css`var(--windows-text-color)`};
`;

const StyledProgramOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    flex: 1;
    gap: 15px;

    .program-icon {
        box-shadow: inset 0px -3px 0px 0px var(--windows-color);
    }
`;

const StyledOption = styled.div`
    height: 100%;
    flex: 0 1 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon-option {
        font-size: 18px;
    }

    .image-option {
        height: auto;
        width: 60%;
    }
    
    .kali-logo {
        height: 24px;
        width: 24px;
        filter: brightness(0) saturate(100%) invert(76%) sepia(13%) saturate(1586%) hue-rotate(119deg) brightness(93%) contrast(91%);
    }

    &:hover {
        background-color: #cccccc40;
        .icon-option {
            color: ${({ theme }) => shadeColor(theme.windowsColor, 60)};
        }
        .kali-logo {
            filter: brightness(0) saturate(100%) invert(87%) sepia(13%) saturate(1586%) hue-rotate(119deg) brightness(103%) contrast(91%);
        }
    }
    
    &:focus {
        outline: none;
        border: none;
        background-color: #cccccc40;
    }

    ${({ selected }) =>
        selected &&
        css`
            background-color: #cccccc40;
        `}
`;

const StyledSystemTray = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 100%;
`;

const StyledSystemIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    position: relative;

    :hover {
        background-color: #cccccc40;
    }

    .icon-option {
        font-size: 16px;
    }

    .notification-badge {
        position: absolute;
        top: 8px;
        right: 6px;
        width: 18px;
        height: 18px;
        background-color: #d13438;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
    }
`;

const StyledWindowsDateTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 15px;
    padding-inline: 5px;
    font-size: 12px;
    user-select: none;

    :hover {
        background-color: #cccccc40;
    }

    :focus {
        outline: none;
        border: none;
        background-color: #cccccc40;
    }
`;

const Taskbar = () => {
    const timeRef = useRef(null);
    const dateRef = useRef(null);

    const currentPrograms = useSelector(
        ({ programs }) => programs.currentPrograms,
        shallowEqual
    );

    const currentProgramArray = Object.keys(currentPrograms);
    const maxFocusLevel = currentProgramArray.length;

    const dispatch = useDispatch();

    const notifications = useSelector(state => state.notifications.notifications);
    const unreadCount = notifications.filter(n => !n.read).length;
    const isDarkTheme = useSelector(state => state.theme.mode === 'dark');

    const onClickProgramOption = (instanceId) => {
        const program = currentPrograms[instanceId];
        if (program.isMinimized || program.focusLevel === maxFocusLevel) {
            dispatch(toggleMinimizeProgram(instanceId));

            if (!program.isMinimized) {
                dispatch(defocusProgram(instanceId));
                return;
            }
        }

        dispatch(focusProgram(instanceId));
    };

    const handleDateTimeClick = () => {
        dispatch(toggleCalendar());
    };

    const handleWindowsClick = () => {
        dispatch(toggleWindowsMenu());
    };

    const handleNotificationsClick = () => {
        dispatch(toggleNotifications());
    };

    const handleWidgetsClick = () => {
        dispatch(toggleWidgets());
    };

    const handleThemeClick = () => {
        dispatch(toggleTheme());
    };

    useLayoutEffect(() => {
        const checkNumberFormat = (number) => {
            return number.padStart(2, "0");
        };

        const updateDateTime = () => {
            if (!timeRef.current || !dateRef.current) return;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let day = currentDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();

            month = month.toString();
            day = day.toString();
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = checkNumberFormat(minutes.toString());

            timeRef.current.innerText = `${hours}:${minutes} ${ampm}`;
            dateRef.current.innerText = `${month}/${day}/${year}`;

            setTimeout(() => updateDateTime(), 500);
        };
        updateDateTime();
    }, []);

    const programLength = Object.keys(AVAILABLE_ICONS).length;

    return (
        <StyledTaskbar maxFocusLevel={maxFocusLevel}>
            <StyledOption
                id="windows-option-taskbar"
                style={{ marginRight: "15px" }}
                onClick={handleWindowsClick}
                tabIndex={programLength + 1}
            >
                <img 
                    src="https://www.kali.org/images/kali-dragon-icon.svg" 
                    alt="Kali Linux" 
                    className="kali-logo"
                />
            </StyledOption>
            <StyledProgramOptions>
                {currentProgramArray.map((instanceId) => {
                    const { focusLevel, id, isMinimized } =
                        currentPrograms[instanceId];
                    const programImage = AVAILABLE_ICONS[id].image;
                    return (
                        <StyledOption
                            key={instanceId}
                            selected={
                                !isMinimized && focusLevel === maxFocusLevel
                            }
                            className="program-icon"
                            onClick={() => onClickProgramOption(instanceId)}
                        >
                            <img
                                className="image-option"
                                src={programImage}
                                alt=""
                            />
                        </StyledOption>
                    );
                })}
            </StyledProgramOptions>
            <StyledSystemTray>
                <StyledSystemIcon onClick={handleThemeClick} title={isDarkTheme ? "Light mode" : "Dark mode"}>
                    <FontAwesomeIcon 
                        icon={isDarkTheme ? faSun : faMoon} 
                        className="icon-option" 
                    />
                </StyledSystemIcon>
                <StyledSystemIcon onClick={handleNotificationsClick} title="Notifications">
                    <FontAwesomeIcon icon={faBell} className="icon-option" />
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                    )}
                </StyledSystemIcon>
                <StyledSystemIcon onClick={handleWidgetsClick} title="Widgets">
                    <FontAwesomeIcon icon={faGripVertical} className="icon-option" />
                </StyledSystemIcon>
            </StyledSystemTray>
            <StyledWindowsDateTime tabIndex={programLength + 2}
                onClick={handleDateTimeClick}
                id="date-time-taskbar"
                className="notranslate"
            >
                <span ref={timeRef}></span>
                <span ref={dateRef}></span>
            </StyledWindowsDateTime>
        </StyledTaskbar>
    );
};

export default Taskbar;
