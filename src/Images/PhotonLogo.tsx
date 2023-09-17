import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import Logo from "./photon_icon.png";

const PhotonLogoWrapper = styled.div`
    color: white;
    height: 6rem;
    font-size: 4rem;
    font-weight: normal;
`

export const PhotonLogo = () => {

    return (
        <PhotonLogoWrapper >
            <img src={Logo} height={'100%'}/>
        </PhotonLogoWrapper>
    )
}