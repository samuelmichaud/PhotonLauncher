import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animatedLogo from './../Assets/animatedLogo.json'

const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
`

export const Loading = () => {
    return (
        <LoadingWrapper>
            <Lottie animationData={animatedLogo} loop={true} />
            <h1>{'Loading...'}</h1>
        </LoadingWrapper>
    )
}