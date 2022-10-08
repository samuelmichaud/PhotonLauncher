import React from 'react';

interface GamepadButtonProps {
    direction?: string;
}

export const GamepadButton = ({direction}: GamepadButtonProps) => {
    let angle = 0;

    switch(direction) {
        case 'up': angle = 90; break;
        case 'down': angle = 270; break;
        case 'right': angle = 180; break;
        default: case 'left': angle = 0; break;
    }

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${angle})`}>
            <circle cx="12.0871" cy="20.4348" r="3.06522" transform="rotate(180 12.0871 20.4348)" stroke="white"/>
            <circle cx="12.0871" cy="3.56528" r="3.06522" transform="rotate(180 12.0871 3.56528)" stroke="white"/>
            <circle cx="20.4348" cy="11.9131" r="3.06522" transform="rotate(180 20.4348 11.9131)" stroke="white"/>
            <circle cx="3.56515" cy="11.9131" r="3.06522" transform="rotate(180 3.56515 11.9131)" fill="white" stroke="white"/>
        </svg>
    )
}