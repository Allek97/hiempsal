import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { useUI } from "@components/ui/context";
import {
    Article,
    Container,
    Content,
    Navigation,
    Root,
} from "./Usernav.styled";

const Usernav: FC = ({ children }) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const { isSidebarOpen, closeSidebar } = useUI();

    useEffect(() => {
        if (ref.current) {
            if (isSidebarOpen) disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isSidebarOpen]);

    console.log(isSidebarOpen);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isSidebarOpen && (
                <Root ref={ref}>
                    <Container>
                        <Navigation>
                            <nav>
                                <button type="button" aria-label="Cart">
                                    <h1>Your Cart</h1>
                                </button>
                                <button type="button" aria-label="Wish list">
                                    <h1>Wish List</h1>
                                </button>
                                <button
                                    type="button"
                                    aria-label="Viewed products"
                                >
                                    <h1>Viewed products</h1>
                                </button>
                            </nav>
                        </Navigation>
                        <Content>
                            <Article>{}</Article>
                        </Content>
                    </Container>
                </Root>
            )}
        </>
    );
};

export default Usernav;
