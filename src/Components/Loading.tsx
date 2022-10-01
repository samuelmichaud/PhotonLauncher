import React from 'react';
import styled from 'styled-components';

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
`

export const Loading = () => {
    return (
        <LoadingWrapper>
            <h2>{'Loading...'}</h2>
        </LoadingWrapper>
    )
}