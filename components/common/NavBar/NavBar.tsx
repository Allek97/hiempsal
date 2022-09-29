/* eslint-disable @typescript-eslint/no-empty-function */
import { motion, Variants } from "framer-motion";
import { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "@components/ui/context";
import { useHistory } from "@contexts/History";

import { Media } from "@lib/media";
import { useMediaQueryNext, useScroll, useScrollDirectionNext } from "@hooks";

import { BsPerson } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaShopify } from "react-icons/fa";

import {
    Logo,
    TextLogo as Hiempsal,
    TextLogoRed as HiempsalRed,
    Arrow,
} from "@components/icons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { GiBrokenHeartZone } from "react-icons/gi";
import { FiShoppingBag } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";

import {
    HiemsalWrapper,
    NavbarItem,
    Navigation,
    NavbarRoot,
    UtilWrapper,
    Container,
    WrapperBtn,
    BackBtn,
    UtilityButton,
    UtilityAnimation,
} from "./NavBar.styled";

const Back: FC<{ isLogin: boolean }> = ({ isLogin }) => {
    return (
        <div>
            {isLogin ? (
                <BackBtn className="block">
                    <HiOutlineArrowLeft />
                </BackBtn>
            ) : (
                <Arrow />
            )}
        </div>
    );
};

const UtilityVariant = ({ top }: { top: boolean }): Variants => {
    return {
        hidden: { y: top ? "0%" : "250%" },
        show: {
            y: top
                ? ["0%", "-250%", "-250%", "-250%", "0%"]
                : ["250%", "0%", "0%", "0%", "250%"],
            transition: {
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
            },
        },
    };
};

interface Props {
    cartSize: number;
    wishlistSize: number;
    customerPendingOrders: number;
}

const Navbar: FC<Props> = ({
    cartSize,
    wishlistSize,
    customerPendingOrders,
}) => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");
    const isAuthentificationOpen = router.pathname.includes("authentification");
    const isAccount = router.pathname.includes("account");

    const isHistoric: boolean = useMemo(
        () => isAuthentificationOpen || isUsernavOpen || isAccount,
        [isAuthentificationOpen, isUsernavOpen, isAccount]
    );

    const { isPopupOpen, isMobileMenuOpen } = useUI();
    const { back } = useHistory();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 20 : 0;

    const isScrolled = useScroll(scrollThreshold);

    const hiddenThreshold = isScreenLarge ? 150 : 50;
    const isHidden = useScroll(hiddenThreshold);
    const { direction } = useScrollDirectionNext();

    return (
        <NavbarRoot
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            isPopupOpen={isPopupOpen}
            isUsernavOpen={isUsernavOpen}
            isHidden={isHidden && direction === "down" && !isMobileMenuOpen}
        >
            <Container
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                isAuthentificationOpen={isAuthentificationOpen}
            >
                <Navigation>
                    <div className="flex items-center">
                        {!isMobileMenuOpen && (
                            <WrapperBtn
                                onClick={() => back("/")}
                                isHistoric={isHistoric}
                                type="button"
                                aria-label={
                                    isHistoric ? "back" : "hiempsal shop logo"
                                }
                            >
                                {isHistoric ? (
                                    <Back isLogin={isAuthentificationOpen} />
                                ) : (
                                    <Logo />
                                )}
                            </WrapperBtn>
                        )}
                        {!isAuthentificationOpen && (
                            <Media greaterThanOrEqual="lg">
                                <nav>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="All"
                                        >
                                            All
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="Clothes"
                                        >
                                            Clothes
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="Technologies"
                                        >
                                            Technologies
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="More"
                                        >
                                            More
                                        </NavbarItem>
                                    </Link>
                                </nav>
                            </Media>
                        )}
                    </div>
                    <Link href="/" passHref>
                        <HiemsalWrapper
                            isUsernavOpen
                            isAuthentificationOpen={isAuthentificationOpen}
                            isScrolled={isScrolled}
                            role="button"
                        >
                            {isAuthentificationOpen ? (
                                <HiempsalRed />
                            ) : (
                                <Hiempsal />
                            )}
                        </HiemsalWrapper>
                    </Link>
                    <div className="hidden lg:block">
                        <UtilWrapper>
                            <Link href="/cart/wishlist" passHref>
                                <UtilityButton
                                    aria-label="Wish list"
                                    type="button"
                                    $isWishlist
                                    whileHover={
                                        wishlistSize > 0
                                            ? {
                                                  scale: 1.1,
                                              }
                                            : { color: "var(--orange-red)" }
                                    }
                                >
                                    <motion.div
                                        key={wishlistSize}
                                        initial="hidden"
                                        variants={UtilityVariant({ top: true })}
                                        animate={wishlistSize > 0 && "show"}
                                    >
                                        {wishlistSize > 0 ? (
                                            <>
                                                <FaHeart
                                                    style={{
                                                        fill: "var(--orange-red)",
                                                        width: "25px",
                                                    }}
                                                    className="w-6"
                                                />
                                                <span>{wishlistSize}</span>
                                            </>
                                        ) : (
                                            <FaRegHeart
                                                style={{
                                                    width: "25px",
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                    <UtilityAnimation>
                                        <motion.div
                                            key={wishlistSize}
                                            initial="hidden"
                                            variants={UtilityVariant({
                                                top: false,
                                            })}
                                            animate={wishlistSize > 0 && "show"}
                                        >
                                            <GiBrokenHeartZone
                                                style={{
                                                    fill: "var(--orange-red)",
                                                    width: "25px",
                                                }}
                                            />
                                        </motion.div>
                                    </UtilityAnimation>
                                </UtilityButton>
                            </Link>
                            <Link href="/cart/bag" passHref>
                                <UtilityButton aria-label="Cart" type="button">
                                    <motion.div
                                        key={cartSize}
                                        initial="hidden"
                                        variants={UtilityVariant({ top: true })}
                                        animate={cartSize > 0 && "show"}
                                    >
                                        <FiShoppingBag
                                            style={{ width: "23px" }}
                                        />
                                        {cartSize > 0 && (
                                            <span>{cartSize}</span>
                                        )}
                                    </motion.div>
                                    <UtilityAnimation>
                                        <motion.div
                                            key={cartSize}
                                            initial="hidden"
                                            variants={UtilityVariant({
                                                top: false,
                                            })}
                                            animate={cartSize > 0 && "show"}
                                        >
                                            <FaShopify
                                                style={{
                                                    fill: "var(--green)",
                                                    width: "23px",
                                                }}
                                            />
                                        </motion.div>
                                    </UtilityAnimation>
                                </UtilityButton>
                            </Link>
                            <Link href="/account/overview" passHref>
                                <UtilityButton
                                    aria-label="Profile"
                                    type="button"
                                >
                                    <motion.div
                                        key={customerPendingOrders}
                                        initial="hidden"
                                        variants={UtilityVariant({ top: true })}
                                        animate={
                                            customerPendingOrders > 0 && "show"
                                        }
                                    >
                                        <BsPerson />
                                        {customerPendingOrders > 0 && (
                                            <span>{customerPendingOrders}</span>
                                        )}
                                    </motion.div>
                                    <UtilityAnimation>
                                        <motion.div
                                            key={customerPendingOrders}
                                            initial="hidden"
                                            variants={UtilityVariant({
                                                top: false,
                                            })}
                                            animate={
                                                customerPendingOrders > 0 &&
                                                "show"
                                            }
                                        >
                                            <MdNotificationsActive
                                                style={{
                                                    width: "23px",
                                                    fill: "var(--orange-red)",
                                                }}
                                            />
                                        </motion.div>
                                    </UtilityAnimation>
                                </UtilityButton>
                            </Link>
                        </UtilWrapper>
                    </div>
                </Navigation>
            </Container>
        </NavbarRoot>
    );
};

export default Navbar;
