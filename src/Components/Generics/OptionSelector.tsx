import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE, THEME_PRIMARY_DARK, THEME_DARK, THEME_TRANSPARENT } from '../../Constants';

interface OptionProps {
    displayName: string;
    value: string;
}

interface OptionSelectorProps {
    label: string; 
    options: Array<OptionProps>;
    focused?: boolean;
    getCurrentOption?: (option: any) => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
}

interface OptionSelectorWrapperProps {
    focused?: boolean;
}

const OptionSelectorWrapper = styled.div<OptionSelectorWrapperProps>`
    color: white;
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    box-shadow: 0rem 0rem 0.6rem rgba(255, 255, 255, ${({ focused }) => focused ? '0.50' : '0'});
    border-style: solid;
    border-width: ${FOCUS_BORDER_SIZE}rem;
    box-sizing: border-box;
    border-radius: 0.7rem;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    padding: 2rem;
    justify-content: space-between;
    transition: all 0.2s ease-in-out;
  `;

const Selector = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const OptionSelector = ({label, getCurrentOption, options}: OptionSelectorProps) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const action = () => {
        let nextOption = (selectedOption < options.length - 1)? (selectedOption + 1) : 0;
        setSelectedOption(nextOption);
        getCurrentOption(options[nextOption]);
    }

    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <OptionSelectorWrapper ref={ref} focused={focused} onClick={() => action()}  onMouseEnter={() => focusSelf()} >
            {label}
            <Selector>
                {'< '}
                {options[selectedOption].displayName}
                {' >'}
            </Selector>
        </OptionSelectorWrapper>
        );
}