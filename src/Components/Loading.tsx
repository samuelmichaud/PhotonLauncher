import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animatedLogo from './../Images/animatedLogo.json';

const LoadingWrapper = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 2rem;
`

interface LoadingProps {
    loadingMessage?: string;
}

export const Loading = ({loadingMessage}: LoadingProps) => {

    return (
        <LoadingWrapper>
            <Lottie animationData={animatedLogo} loop={true} />
            {loadingMessage && <h1>{loadingMessage}</h1>}
        </LoadingWrapper>
    )
}