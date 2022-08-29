import { HelpCard } from "@components/elements";
import { FunctionalLink } from "@components/utils";
import { getConfig } from "@framework/api/config";
import { getAllProducts } from "@framework/product";
import { Product } from "@framework/types/product";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import {
    Content,
    HelpCardWrapper,
    NavBtn,
    Navigation,
    Root,
} from "./Commun.styled";

const Account: FC = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const router = useRouter();
    const isOverviewSelected = router.pathname === "/account/overview";
    const isOrderSelected = router.pathname === "/account/orders";
    const isSettingSelected = router.pathname === "/account/settings";
    const isNotificationSelected = router.pathname === "/account/notifications";

    useEffect(() => {
        let flag = true;

        async function fetcher() {
            const config = getConfig();
            const data: Product[] = await getAllProducts(config);

            if (flag) setProducts(data);
        }

        fetcher();

        return () => {
            flag = false;
        };
    }, []);

    return (
        <Root>
            <Navigation>
                <nav>
                    <Link href="/account/overview" passHref>
                        <FunctionalLink>
                            <NavBtn
                                isSelected={isOverviewSelected}
                                className="border-t-2"
                            >
                                <HiArrowNarrowRight />
                                <h1
                                    className="font-bold"
                                    style={{
                                        fontWeight: isOverviewSelected
                                            ? "700"
                                            : "",
                                    }}
                                >
                                    Account
                                </h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>
                    <Link href="/account/orders" passHref>
                        <FunctionalLink>
                            <NavBtn isSelected={isOrderSelected}>
                                <HiArrowNarrowRight />
                                <h1
                                    style={{
                                        fontWeight: isOrderSelected
                                            ? "700"
                                            : "",
                                    }}
                                >
                                    Orders
                                </h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>
                    <Link href="/account/settings" passHref>
                        <FunctionalLink>
                            <NavBtn isSelected={isSettingSelected}>
                                <HiArrowNarrowRight />
                                <h1
                                    style={{
                                        fontWeight: isSettingSelected
                                            ? "700"
                                            : "",
                                    }}
                                >
                                    Settings
                                </h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>
                    <Link href="/account/notifications" passHref>
                        <FunctionalLink>
                            <NavBtn isSelected={isNotificationSelected}>
                                <HiArrowNarrowRight />
                                <h1
                                    style={{
                                        fontWeight: isNotificationSelected
                                            ? "700"
                                            : "",
                                    }}
                                >
                                    Notifications
                                </h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>
                    <Link href="/account/logout" passHref>
                        <FunctionalLink>
                            <NavBtn>
                                <ImExit />
                                <h1>Logout</h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>

                    <HelpCardWrapper>
                        <HelpCard />
                    </HelpCardWrapper>
                </nav>
            </Navigation>

            <Content>{children}</Content>
        </Root>
    );
};

export default Account;
