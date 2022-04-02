import {
    ButtonHTMLAttributes,
    ElementType,
    FC,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { Ripple } from "..";
import { Root } from "./Button.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ElementType<any> | undefined;
    href?: string;
    color?: string;
    during?: number;
    isRippleActive?: boolean;
    isHoverActive?: boolean;
}

const Button: FC<Props> = ({
    children,
    Component = "button",
    color = "var(--accents-2)",
    during = 2000,
    isRippleActive,
    isHoverActive = true,
    ...rest
}) => {
    const [display, setDisplay] = useState<boolean>(false);
    useEffect(() => {
        setDisplay(true);
    }, []);
    if (!display) return null;

    return (
        <Ripple
            color={color}
            during={during}
            className="w-full"
            isRippleActive={isRippleActive}
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
