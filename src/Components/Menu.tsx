import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import {
    useFocusable,
    FocusContext,
    KeyPressDetails
}  from '@noriginmedia/norigin-spatial-navigation';
import { FRAME_PADDING, FOCUS_BORDER_SIZE } from '../Constants';

interface MenuItemBoxProps {
    focused?: boolean;
    action?: () => void;
    onEnterPress?: (props: object, details: KeyPressDetails) => void;
    label: string; 
    children?: any;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
    min-width: 50px;
    height: 50px;
    color: white;
    background-color: #101322;
    border-color: ${({ focused }) => (focused ? 'white' : 'transparent')};
    padding: 5px 10px;
    border-style: solid;
    border-width: ${FOCUS_BORDER_SIZE}px;
    box-sizing: border-box;
    border-radius: 7px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  `;

function MenuItem({label, action, onEnterPress, children}: MenuItemBoxProps) {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: () => { focusSelf(); action(); }
    });

    return (
        <MenuItemBox ref={ref} focused={focused} onClick={() => action()} label={label}  onMouseEnter={() => focusSelf()}>
            {children}
        </MenuItemBox>
        );
}

interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
    position: absolute;
    right: ${FRAME_PADDING}px;
    top: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: end;
    max-height: 80px;
    background-color: ${({ hasFocusedChild }) =>
        hasFocusedChild ? 'transparent' : 'transparent'};
  `;

interface MenuProps {
    focusKey: string;
}

function MenuRender({ focusKey: focusKeyParam }: MenuProps) {
    const {
        ref,
        focusSelf,
        hasFocusedChild,
        focusKey,
        // setFocus, -- to set focus manually to some focusKey
        //navigateByDirection // -- to manually navigate by direction
        // pause, -- to pause all navigation events
        // resume, -- to resume all navigation events
        // updateAllLayouts -- to force update all layouts when needed
    } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: null,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true,
        onFocus: () => { },
        onBlur: () => { },
        //extraProps: { foo: 'bar' }
    });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div style={{position: 'relative', marginTop: '10px', padding: '0 ' + FRAME_PADDING + 'px' }}>
                <svg width="160" height="50" viewBox="0 0 202 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.4634 20.9294C28.5897 20.9294 29.9712 17.8797 29.9712 14.9496H9.00937C4.95515 14.9496 0 18.0292 0 23.9193C0 29.8094 5.04525 32.8891 9.00937 32.8891H21.0219C22.148 32.8891 24.025 33.7711 24.025 35.879C24.025 37.9869 22.088 38.8689 21.0219 38.8689H0C0 42.2026 2.94306 44.8487 6.60687 44.8487H21.0219C25.4064 44.8487 30.0312 41.5 30.0312 35.879C30.0312 30.2579 25.5266 26.9092 21.0219 26.9092H9.00937C7.64295 26.9092 6.00625 25.788 6.00625 23.9193C6.00625 22.0506 7.58289 20.9294 9.00937 20.9294H22.4634Z" fill="white"/>
                    <path d="M33.3347 6.57781C33.3347 1.25576 39.3409 0 39.3409 0V17.9694C39.3409 17.9694 42.7194 14.9496 48.3503 14.9496C55.3025 14.7253 63.3659 20.6454 63.3659 29.8991V44.8487H57.3597V31.0054C57.3597 23.6054 51.9841 21.1088 48.3503 21.1088C45.8427 21.1088 39.3409 22.5141 39.3409 32.2612V44.8487H33.3347V6.57781Z" fill="white"/>
                    <path d="M66.6693 29.8991C66.6693 22.0506 72.9909 14.9496 81.685 14.9496C90.379 14.9496 96.7006 22.1104 96.7006 29.8991V44.8487C96.7006 44.8487 90.6117 44.3853 90.6943 38.4652C90.7145 37.0301 90.6943 34.5036 90.6943 29.8991C90.6943 25.2947 86.9404 20.9294 81.685 20.9294C76.4295 20.9294 72.6756 25.2947 72.6756 29.8991C72.6756 34.5036 76.3694 38.8689 81.685 38.8689C86.2197 38.8689 88.3669 42.8754 88.3819 44.8487H81.685C72.9309 44.8487 66.6693 37.7477 66.6693 29.8991Z" fill="white"/>
                    <path d="M130.035 6.57781C130.035 0.597983 124.029 0 124.029 0V29.8991C124.029 35.3557 119.524 38.8689 115.02 38.8689C110.515 38.8689 106.01 35.3856 106.01 29.8991C106.01 25.8376 109.329 20.9294 114.99 20.9294C120.65 20.9294 121.116 16.2502 121.116 16.2502C121.116 16.2502 118.804 14.9496 114.494 14.9496C106.911 14.9496 100.004 21.5274 100.004 29.8991C100.004 37.06 105.725 44.8487 115.02 44.8487C124.314 44.8487 130.035 37.0899 130.035 29.8991V6.57781Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M155.554 24.561C156.452 25.7707 157.364 27.5715 157.364 29.8991C157.364 35.2062 152.859 38.8689 148.354 38.8689C143.85 38.8689 139.345 35.1763 139.345 29.8991C139.345 25.8376 142.663 20.9294 148.324 20.9294C153.985 20.9294 154.511 16.295 154.511 16.295C154.511 16.295 152.303 14.9496 147.829 14.9496C141.657 14.9496 133.339 20.2567 133.339 29.8991C133.339 37.06 139.06 44.8487 148.354 44.8487C157.649 44.8487 163.37 37.0899 163.37 29.8991C163.37 25.145 161.154 21.7798 159.564 19.9767L155.554 24.561Z" fill="white"/>
                    <path d="M155.554 24.561L155.44 24.4628L155.361 24.5534L155.433 24.6499L155.554 24.561ZM154.511 16.295L154.66 16.3118L154.671 16.2172L154.589 16.1675L154.511 16.295ZM159.564 19.9767L159.676 19.8781L159.563 19.7496L159.45 19.8785L159.564 19.9767ZM155.433 24.6499C156.318 25.8419 157.214 27.6122 157.214 29.8991H157.514C157.514 27.5308 156.586 25.6996 155.674 24.4721L155.433 24.6499ZM157.214 29.8991C157.214 35.115 152.785 38.7194 148.354 38.7194V39.0184C152.933 39.0184 157.514 35.2974 157.514 29.8991H157.214ZM148.354 38.7194C143.924 38.7194 139.495 35.0854 139.495 29.8991H139.195C139.195 35.2672 143.775 39.0184 148.354 39.0184V38.7194ZM139.495 29.8991C139.495 25.902 142.763 21.0789 148.324 21.0789V20.7799C142.563 20.7799 139.195 25.7732 139.195 29.8991H139.495ZM148.324 21.0789C151.204 21.0789 152.795 19.8966 153.662 18.6996C154.093 18.1044 154.342 17.5098 154.483 17.0642C154.554 16.8411 154.598 16.6548 154.624 16.5235C154.637 16.4578 154.646 16.4058 154.652 16.3698C154.655 16.3518 154.657 16.3377 154.658 16.328L154.659 16.3166L154.66 16.3118C154.66 16.3118 154.66 16.3118 154.511 16.295C154.361 16.2783 154.361 16.2781 154.361 16.2781L154.36 16.2887C154.359 16.2965 154.358 16.3085 154.355 16.3244C154.35 16.3563 154.342 16.4038 154.33 16.4649C154.305 16.587 154.264 16.7627 154.197 16.9742C154.063 17.3974 153.827 17.9614 153.418 18.5248C152.607 19.6451 151.106 20.7799 148.324 20.7799V21.0789ZM154.511 16.295C154.589 16.1675 154.589 16.1675 154.589 16.1675L154.587 16.166L154.581 16.1626C154.576 16.1597 154.569 16.1555 154.56 16.1502C154.541 16.1397 154.514 16.1245 154.478 16.1054C154.406 16.0672 154.3 16.0133 154.158 15.9489C153.876 15.8201 153.454 15.6495 152.891 15.4793C151.767 15.1388 150.081 14.8001 147.829 14.8001V15.0991C150.051 15.0991 151.706 15.4331 152.804 15.7653C153.353 15.9315 153.762 16.0972 154.034 16.2207C154.169 16.2825 154.27 16.3337 154.336 16.369C154.37 16.3867 154.394 16.4005 154.41 16.4096C154.418 16.4142 154.428 16.4198 154.428 16.4198L154.432 16.4221C154.432 16.4221 154.432 16.4225 154.511 16.295ZM147.829 14.8001C141.591 14.8001 133.189 20.1585 133.189 29.8991H133.489C133.489 20.3548 141.724 15.0991 147.829 15.0991V14.8001ZM133.189 29.8991C133.189 37.1287 138.964 44.9982 148.354 44.9982V44.6992C139.156 44.6992 133.489 36.9912 133.489 29.8991H133.189ZM148.354 44.9982C157.745 44.9982 163.52 37.1586 163.52 29.8991H163.22C163.22 37.0211 157.553 44.6992 148.354 44.6992V44.9982ZM163.52 29.8991C163.52 25.0964 161.281 21.6974 159.676 19.8781L159.451 20.0754C161.027 21.8622 163.22 25.1937 163.22 29.8991H163.52ZM159.45 19.8785L155.44 24.4628L155.667 24.6592L159.677 20.0749L159.45 19.8785Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M167.312 11.0887L162.794 16.2538L173.881 44.6693L182.109 23.5605L190.368 44.6693L201.84 15.129C201.84 15.129 195.954 13.5294 193.867 18.7916L190.338 27.8959L185.278 14.9197H178.881L173.836 27.8959L167.312 11.0887Z" fill="white"/>
                    <path d="M167.312 11.0887L167.424 11.0456L167.352 10.8605L167.221 11.0101L167.312 11.0887ZM162.794 16.2538L162.703 16.1752L162.656 16.2297L162.682 16.2971L162.794 16.2538ZM173.881 44.6693L173.769 44.7127L173.881 44.9997L173.993 44.7127L173.881 44.6693ZM182.109 23.5605L182.221 23.5171L182.109 23.2305L181.997 23.5173L182.109 23.5605ZM190.368 44.6693L190.256 44.7127L190.368 45L190.48 44.7124L190.368 44.6693ZM201.84 15.129L201.952 15.1721L202 15.0485L201.871 15.0136L201.84 15.129ZM190.338 27.8959L190.226 27.9392L190.338 28.2272L190.45 27.939L190.338 27.8959ZM185.278 14.9197L185.39 14.8764L185.36 14.8001H185.278V14.9197ZM178.881 14.9197V14.8001H178.799L178.769 14.8765L178.881 14.9197ZM173.836 27.8959L173.724 27.939L173.836 28.2274L173.948 27.9391L173.836 27.8959ZM167.221 11.0101L162.703 16.1752L162.885 16.3323L167.402 11.1672L167.221 11.0101ZM162.682 16.2971L173.769 44.7127L173.993 44.626L162.906 16.2104L162.682 16.2971ZM173.993 44.7127L182.221 23.6038L181.997 23.5173L173.769 44.626L173.993 44.7127ZM181.997 23.6039L190.256 44.7127L190.48 44.626L182.221 23.5171L181.997 23.6039ZM190.48 44.7124L201.952 15.1721L201.728 15.0859L190.256 44.6263L190.48 44.7124ZM201.84 15.129C201.871 15.0136 201.871 15.0136 201.871 15.0136L201.866 15.0122C201.866 15.0122 201.859 15.0102 201.853 15.0087C201.841 15.0057 201.824 15.0014 201.801 14.996C201.756 14.9853 201.691 14.9703 201.607 14.9533C201.439 14.9193 201.198 14.8768 200.901 14.8425C200.31 14.7739 199.498 14.7377 198.618 14.8687C196.855 15.1311 194.818 16.0671 193.755 18.7477L193.978 18.8355C195.002 16.2539 196.952 15.3585 198.654 15.1052C199.507 14.9783 200.296 15.0131 200.874 15.0801C201.162 15.1135 201.397 15.1548 201.559 15.1877C201.64 15.2041 201.703 15.2185 201.745 15.2286C201.766 15.2336 201.783 15.2376 201.793 15.2404C201.798 15.2417 201.805 15.2434 201.805 15.2434L201.808 15.2442C201.808 15.2442 201.808 15.2443 201.84 15.129ZM193.755 18.7477L190.226 27.8528L190.45 27.939L193.978 18.8355L193.755 18.7477ZM190.45 27.8526L185.39 14.8764L185.166 14.963L190.226 27.9392L190.45 27.8526ZM185.278 14.8001H178.881V15.0393H185.278V14.8001ZM178.769 14.8765L173.724 27.8527L173.948 27.9391L178.993 14.9628L178.769 14.8765ZM173.948 27.8528L167.424 11.0456L167.2 11.1318L173.724 27.939L173.948 27.8528Z" fill="white"/>
                </svg>
                <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
                    <MenuItem label={'Refresh library'} action={() => window.ShadowApi.scanForGames()} >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '5px'}}>
                            <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C11.7 16 14.8 13.4 16 10H14C12.8 12.3 10.6 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C9.7 2 11.1 2.7 12 4L9 7H16V0L14 2C12.2 1 10.2 0 8 0Z" fill="white"/>
                        </svg>
                        <span>{'Refresh library'}</span>
                    </MenuItem>
                    <MenuItem label={'Quit'} action={() => window.ShadowApi.quitApp()}>
                        <svg width="20" height="30" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.2003 0C17.0957 0 16.2003 0.895431 16.2003 2V18C16.2003 19.1046 17.0957 20 18.2003 20C19.3048 20 20.2003 19.1046 20.2003 18V2C20.2003 0.895431 19.3048 0 18.2003 0ZM8.69964 8.67666C7.9688 7.84844 6.70493 7.76949 5.87671 8.50033C2.10471 11.8288 0 16.6727 0 22C0 31.9411 8.05888 40 18 40C27.9412 40 36 31.9411 36 22C36 16.7023 33.8825 11.838 30.1279 8.50438C29.3019 7.77102 28.0378 7.8461 27.3044 8.67209C26.5711 9.49807 26.6462 10.7622 27.4722 11.4955C30.3586 14.0583 32 17.8289 32 22C32 29.732 25.732 36 18 36C10.268 36 4 29.732 4 22C4 17.8006 5.62756 14.0548 8.5233 11.4996C9.35153 10.7688 9.43047 9.50489 8.69964 8.67666Z" fill="white" fillOpacity="0.75"/>
                        </svg>
                    </MenuItem>
                </MenuWrapper>
            </div>
            <hr style={{border: 'none', background: '#9ab0ff', width: `calc(100vw - 2 * ${FRAME_PADDING}px)`, height: '1px'}}/>
        </FocusContext.Provider>
    );
}

export const Menu = MenuRender;