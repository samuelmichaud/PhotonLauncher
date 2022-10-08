import React from 'react';

interface MouseIconProps {
    button?: string;
}

export const MouseIcon = ({button}: MouseIconProps) => {

    return (
        <svg width="2rem" height="3rem" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0.0350351V7.96503H16C16 3.88504 12.95 0.525035 9 0.0350351Z" fill={`${(button == 'right')? 'white' : 'transparent'}`} stroke={`${(button == 'right')? 'transparent' : 'white'}`}/>
            <path d="M0 7.96503C0 3.88503 3.05 0.525034 7 0.0350337V7.96503H0Z" fill={`${(button == 'left')? 'white' : 'transparent'}`} stroke={`${(button == 'left')? 'transparent' : 'white'}`}/>
            <path d="M0 13.965C0 18.385 3.58 21.965 8 21.965C12.42 21.965 16 18.385 16 13.965V9.96503H0V13.965Z" fill="white"/>
        </svg>
    )
}