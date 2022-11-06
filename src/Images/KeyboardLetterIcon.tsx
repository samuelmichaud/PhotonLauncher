import React from 'react';
import styled from 'styled-components';

interface KeyboardLetterIconProps {
    letter?: string;
}

export const KeyboardLetterIcon = styled(({className, letter}) => (
        <span className={className}>{letter}</span>
    ))<KeyboardLetterIconProps>`
    background-color: #D9D9D9;
    border-radius: 0.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    color: black;
    font-size: 1.8rem;
    line-height: 1.8rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`