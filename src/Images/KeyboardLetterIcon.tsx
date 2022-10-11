import React from 'react';

interface KeyboardLetterIconProps {
    letter?: string;
}

export const KeyboardLetterIcon = ({letter}: KeyboardLetterIconProps) => {

    return (
        <svg width="2.8rem" height="2.8rem" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
            <rect width="2.8rem" height="2.8rem" rx="5" fill="#D9D9D9"/>
            <text x="50%" y="55%" fontSize="2rem" color="black" dominantBaseline="middle" textAnchor="middle">{letter}</text>
        </svg>
    )
}