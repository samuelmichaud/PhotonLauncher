import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animatedLogo from './../Images/animatedLogo.json';
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
        <LoadingWrapper>
            <Lottie animationData={animatedLogo} loop={true} />
            <h1>{t('LoadingMessage')}</h1>
        </LoadingWrapper>
    )
}