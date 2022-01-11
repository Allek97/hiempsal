import styled from "@emotion/styled";

const CloseSvg = styled.svg`
    transform: none;
    color: #191919;

    display: block;
    fill-rule: evenodd;
    clip-rule: evenodd;
    stroke-linejoin: round;
    stroke-miterlimit: 2;
    fill: currentColor;
`;

const Close = ({ ...props }) => {
    return (
        <CloseSvg viewBox="0 0 16 17" {...props}>
            <path
                d="M6.83 8.678L.774 14.71l1.3 1.293L8.13 9.972l-1.3-1.294zm1.732-1.723L9.86 
            8.249l6.057-6.032L14.62.923 8.562 6.955zM9.86 8.678L8.562 9.972l6.058 6.031 1.3-1.293L9.86 8.678zM8.13 6.955L2.072.923.773 2.217 6.831 8.25 8.13 6.955z"
            />
        </CloseSvg>
    );
};

export default Close;
