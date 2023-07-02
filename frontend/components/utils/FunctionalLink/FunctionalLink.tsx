/* eslint-disable react/require-default-props */
import { forwardRef, MouseEventHandler, ReactNode } from "react";

// FIX Hacky trick in order to use Link(next/link) with functional components accroding to :
// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component

// BUG: Unfriendly with TS since onClick is passed implicitly, need to make hrer and onClick optional
// NOTE Issue #7915 still not fixed

interface Props {
    children: ReactNode | ReactNode[];
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const FunctionalLink = forwardRef<HTMLAnchorElement, Props>(
    ({ children, href, onClick }, ref) => (
        <a ref={ref} href={href} onClick={onClick}>
            {children}
        </a>
    )
);
FunctionalLink.displayName = "FunctionalLink";

export default FunctionalLink;
