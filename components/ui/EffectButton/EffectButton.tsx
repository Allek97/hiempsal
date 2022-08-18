import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { EffectBtnRoot } from "./EffectButton.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    href?: string;
    isSelected?: boolean;
}

// We render selected for small screen since we can't hover the component
const EffectButton: FC<Props> = ({
    children,
    Component = "button",
    isSelected = false,
    ...rest
}) => {
    return (
        <EffectBtnRoot
            type="button"
            as={Component}
            isSelected={isSelected}
            {...rest}
        >
            {children}
        </EffectBtnRoot>
    );
};

EffectButton.defaultProps = {
    Component: "button",
    isSelected: false,
    href: "/",
};

export default EffectButton;
