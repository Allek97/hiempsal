import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

export const LoaderComponent = styled.div`
    display: block;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--accents-5);
    -webkit-animation: ${spin} 2s linear infinite;
    animation: ${spin} 2s linear infinite;

    &:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--orange-red);
        -webkit-animation: ${spin} 2s linear infinite;
        animation: ${spin} 2s linear infinite;
    }

    &:after {
        content: "";
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--accents-8);
        -webkit-animation: ${spin} 1s linear infinite;
        animation: spin 1s linear infinite;
    }
`;
