import { AvailaibleBreakpoints, Media } from "@lib/media";
import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { EffectBtnRoot } from "./EffectButton.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    breakpointEffect?: AvailaibleBreakpoints;
    href?: string;
}

// We render selected for small screen since we can't hover the component
const EffectButton: FC<Props> = ({
    children,
    Component = "button",
    breakpointEffect = "base",
    ...rest
}) => {
    function getEffectBtn(breakpoint?: AvailaibleBreakpoints) {
        return (
            <EffectBtnRoot
                type="button"
                as={Component}
                isSelected={!!breakpoint}
                {...rest}
            >
                {children}
            </EffectBtnRoot>
        );
    }
    return (
        <>
            <Media greaterThanOrEqual={breakpointEffect}>
                {getEffectBtn()}
            </Media>
            <Media lessThan={breakpointEffect}>
                {getEffectBtn(breakpointEffect)}
            </Media>
        </>
    );
};

EffectButton.defaultProps = {
    Component: "button",
    breakpointEffect: "base",
    href: "/",
};

export default EffectButton;
