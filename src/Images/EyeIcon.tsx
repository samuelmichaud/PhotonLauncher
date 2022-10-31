import React from 'react';

interface EyeIconProps {
    open?: boolean;
}

export const EyeIcon = ({open = true}: EyeIconProps) => {

    return (
        <svg width="2.5rem" height="2.5rem" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            {open?
                <g>
                    <path d="M2 12.68C2 12.68 5.84 5 12.56 5C19.28 5 23.12 12.68 23.12 12.68C23.12 12.68 19.28 20.36 12.56 20.36C5.84 20.36 2 12.68 2 12.68Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.88 15.76C14.4706 15.76 15.76 14.4706 15.76 12.88C15.76 11.2894 14.4706 10 12.88 10C11.2894 10 10 11.2894 10 12.88C10 14.4706 11.2894 15.76 12.88 15.76Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                :
                <g>
                    <path d="M14.52 14.9201C14.2454 15.2148 13.9142 15.4512 13.5462 15.6152C13.1782 15.7792 12.7809 15.8673 12.3781 15.8744C11.9753 15.8815 11.5752 15.8074 11.2016 15.6566C10.8281 15.5057 10.4887 15.2811 10.2039 14.9962C9.919 14.7114 9.69442 14.372 9.54353 13.9985C9.39265 13.6249 9.31855 13.2248 9.32566 12.822C9.33276 12.4192 9.42093 12.0219 9.5849 11.6539C9.74887 11.2859 9.98528 10.9547 10.28 10.6801M18.34 18.7401C16.6306 20.0431 14.5491 20.7649 12.4 20.8001C5.40002 20.8001 1.40002 12.8001 1.40002 12.8001C2.64391 10.482 4.36916 8.45668 6.46002 6.86007L18.34 18.7401ZM10.3 5.04007C10.9884 4.87895 11.6931 4.79841 12.4 4.80007C19.4 4.80007 23.4 12.8001 23.4 12.8001C22.793 13.9357 22.0691 15.0048 21.24 15.9901L10.3 5.04007Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.40002 1.80005L23.4 23.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            }
        </svg>
    )
}