import React, { FC } from 'react';

export interface HyperframeLogoProps {
    fill?: string;
}

const HyperframeLogo: FC<HyperframeLogoProps> = (props) => {
    const fill = props.fill || '#ffffff';

    return (
        <svg
            width="35"
            height="20"
            viewBox="0 0 35 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0146 5.83411H4.1249V14.1685H10.0146V5.83411ZM17.5689 5.83411H14.1374V14.1685H14.221L14.2147 14.1833H18.609L17.5042 18.3346H0.294486C0.131579 18.3346 0 18.2017 0 18.037V1.96555C0 1.80093 0.131579 1.66797 0.294486 1.66797H19.2419L17.5689 5.83411ZM30.0188 5.83411H25.6245L26.7335 1.66797H33.8722C34.0351 1.66797 34.1667 1.80093 34.1667 1.96555V18.037C34.1667 18.2017 34.0351 18.3346 33.8722 18.3346H24.9979L26.6729 14.1685H30.0439V5.83411H30.0188Z"
                fill={fill}
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.59 8.174H26.6667L21.7609 20H19.3338L21.5788 11.826H17.5L22.4079 0H24.8329L22.59 8.174Z"
                fill={fill}
            ></path>
        </svg>
    );
};

export default HyperframeLogo;
