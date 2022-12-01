import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FOCUS_BORDER_SIZE } from '../../Constants';
import { ArrowIcon } from '../../Images/ArrowIcon';

interface OptionProps {
    displayName: string;
    value: string;
}

interface OptionSelectorProps {
    label: string; 
    options: Array<OptionProps>;
    initialOption?: number;
    focused?: boolean;
    onFocus?: ({ x, y, height, width, top, left } : any, focusItem: any) => void;
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

export const OptionSelector = ({label, getCurrentOption, options, onFocus, initialOption = 0}: OptionSelectorProps) => {
    // check if initialOption is ok to avoid crash
    initialOption = (initialOption > 0 && initialOption < options.length)? initialOption : 0;

    const [selectedOption, setSelectedOption] = useState(initialOption);

    const action = () => {
        let nextOption = (selectedOption < options.length - 1)? (selectedOption + 1) : 0;
        setSelectedOption(nextOption);
        getCurrentOption(options[nextOption]);
    }

    const { ref, focused, focusSelf } = useFocusable({
        onFocus,
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <OptionSelectorWrapper ref={ref} focused={focused} onClick={() => action()}  onMouseEnter={() => focusSelf()} >
            {label}
            <Selector>
                {options[selectedOption].displayName}
                <ArrowIcon direction={'right'}/>
            </Selector>
        </OptionSelectorWrapper>
        );
}