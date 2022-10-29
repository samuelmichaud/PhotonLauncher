import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import { Button } from './Button';
import { useSelector } from 'react-redux';
import { MAIN_INPUT_MOUSE } from '../../Constants';

interface FileSelectorProps {
    label: string; 
    onChangeAction?: (event: any) => void;
    focused?: boolean;
    disableState?: boolean;
}

const FileSelectorBox = styled.div<FileSelectorProps>`
    
  `;

const Label = styled.label.attrs({htmlFor: "add-custom-app"})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: inherit;
`

export const FileSelector = ({label, onChangeAction, disableState}: FileSelectorProps) => {
    
    // @ts-ignore (because of globalState which is not recognized)
    const { ui } = useSelector((state) => state.globalState);
    disableState = ui.mainInput !== MAIN_INPUT_MOUSE;

    return (
        <FileSelectorBox label={label} disableState={disableState} >
            <Button label={label} disableState={disableState}>
                <Label>{label}</Label>
                <input type={'file'} name="add-custom-app" id="add-custom-app" accept=".lnk, .exe" style={{'display': 'none'}} onChange={(event) => onChangeAction(event)} />
            </Button>
        </FileSelectorBox>
        );
}