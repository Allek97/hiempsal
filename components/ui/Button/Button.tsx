import { useMediaQueryNext } from "@lib/customHooks";
import { ButtonHTMLAttributes, ElementType, FC, ReactNode } from "react";
import { Ripple } from "..";
import { Root } from "./Button.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    href?: string;
    color?: string;
    during?: number;
    isRippleActive?: boolean | undefined;
    isHoverActive?: boolean;
}

const Button: FC<Props> = ({
    children,
    Component = "button",
    color = "var(--accents-2)",
    during = 2000,
    isRippleActive = undefined,
    isHoverActive = true,
    ...rest
}) => {
    const isScreenLg = useMediaQueryNext("lg");
    return (
        <Ripple
            color={color}
            during={during}
            className="w-full"
            isRippleActive={isRippleActive ?? !isScreenLg}
        >
            <Root
                type="button"
                as={Component}
                isHoverActive={isHoverActive}
                {...rest}
            >
                {children}
            </Root>
        </Ripple>
    );
};

// NOTE defaultProps soon to be depreciated
Button.defaultProps = {
    Component: "button",
    href: "/",
    color: "var(--accents-2)",
    during: 2000,
    isRippleActive: undefined,
    isHoverActive: true,
};

export default Button;
