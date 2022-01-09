import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { Root } from "./EffectButton.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    isSelected?: boolean;
    href?: string;
}

const EffectButton: FC<Props> = ({
    children,
    Component = "button",
    isSelected = false,
    ...rest
}) => {
    return (
        <Root type="button" as={Component} isSelected={isSelected} {...rest}>
            {children}
        </Root>
    );
};

EffectButton.defaultProps = {
    Component: "button",
    isSelected: false,
    href: "/",
};

export default EffectButton;
