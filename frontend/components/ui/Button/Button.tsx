import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { Root } from "./Button.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    href?: string;
    isHoverActive?: boolean;
}

const Button: FC<Props> = ({
    children,
    Component = "button",
    isHoverActive = true,
    ...rest
}) => {
    return (
        <Root
            type="button"
            as={Component}
            isHoverActive={isHoverActive}
            {...rest}
        >
            {children}
        </Root>
    );
};

// NOTE defaultProps soon to be depreciated
Button.defaultProps = {
    Component: "button",
    href: "",
    isHoverActive: true,
};

export default Button;
