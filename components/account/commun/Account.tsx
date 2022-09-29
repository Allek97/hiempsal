import { HelpCard } from "@components/elements";
import { FunctionalLink } from "@components/utils";
import useLogout from "@framework/auth/use-logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import Advertisement from "./Advertisement";
import {
    AdvertisementBoxIn,
    AdvertisementBoxOut,
    Content,
    HelpCardWrapper,
    NavBtn,
    Navigation,
    Root,
} from "./Commun.styled";

const Account: FC = ({ children }) => {
    const router = useRouter();
    const isOverviewSelected = router.pathname === "/account/overview";
    const isOrderSelected = router.pathname.includes("/account/orders");
    const isSettingSelected = router.pathname === "/account/settings";
    const isNotificationSelected = router.pathname === "/account/preferences";

    const logout = useLogout();
    async function logingOut() {
        try {
            await logout();
            router.push("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Root>
            <Navigation>
                <nav>
                    <Link href="/account/overview" passHref>
                        <FunctionalLink>
                            <NavBtn
                                isSelected={isOverviewSelected}
                                className="border-t-2"
                                aria-label="account"
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
                            <NavBtn
                                isSelected={isOrderSelected}
                                aria-label="orders"
                            >
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
                            <NavBtn
                                isSelected={isSettingSelected}
                                aria-label="settings"
                            >
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
                    <Link href="/account/preferences" passHref>
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
                                    Preferences
                                </h1>
                            </NavBtn>
                        </FunctionalLink>
                    </Link>

                    <NavBtn onClick={() => logingOut()}>
                        <ImExit />
                        <h1>Logout</h1>
                    </NavBtn>

                    <HelpCardWrapper>
                        <HelpCard />
                    </HelpCardWrapper>
                </nav>
            </Navigation>
            {isOverviewSelected && (
                <AdvertisementBoxOut>
                    <Advertisement />
                </AdvertisementBoxOut>
            )}
            <Content>
                {children}
                {isOverviewSelected && (
                    <AdvertisementBoxIn>
                        <Advertisement />
                    </AdvertisementBoxIn>
                )}
            </Content>
        </Root>
    );
};

export default Account;
