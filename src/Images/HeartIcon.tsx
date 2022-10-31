import React from 'react';

interface HeartIconProps {
    filled?: boolean;
}

export const HeartIcon = ({filled = true}: HeartIconProps) => {

    return (
        <svg width="1.5rem" height="1.4rem" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 3C8.33 1.268 6.453 0 4.5 0C1.957 0 0 1.932 0 4.5C0 8.029 3.793 10.758 9 16C14.207 10.758 18 8.029 18 4.5C18 1.932 16.043 0 13.5 0C11.545 0 9.67 1.268 9 3Z" 
                  stroke="white" fill={filled? 'white' : 'transparent'}/>
        </svg>
    )
}