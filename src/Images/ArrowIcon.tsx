import React from 'react';

interface GamepadButtonProps {
    direction?: string;
}

export const ArrowIcon = ({direction}: GamepadButtonProps) => {
    let angle = 0;

    switch(direction) {
        case 'up': angle = 90; break;
        case 'down': angle = 270; break;
        case 'right': angle = 180; break;
        default: case 'left': angle = 0; break;
    }

    return (
        <svg width="2.5rem" height="2.5rem" viewBox="0 0 24 37" fill="none" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${angle})`}>
            <g filter="url(#filter0_d_301_3)">
                <path d="M18.5 6L6 18.5L18.5 31" stroke="white"/>
            </g>
            <defs>
                <filter id="filter0_d_301_3" x="0.292969" y="0.646484" width="23.5605" height="35.707" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="2.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_301_3"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_301_3" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}