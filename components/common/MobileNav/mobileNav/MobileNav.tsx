import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, Variants } from "framer-motion";

import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Close from "@components/icons/Close";

import { useUI } from "@components/ui/context";
import { useProductInfo } from "@components/product/context";

import {
    Cart,
    MenuBtn,
    Navigation,
    Profile,
    MobileNavRoot,
} from "./MobileNav.styled";
import { MobileMenu } from "..";

const menuBtnVariants: Variants = {
    openMenu: { rotate: [70, 0] },
    closeMenu: { rotate: 0 },
};

const cartVariants: Variants = {
    expand: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: 0.15,
            ease: [0.19, 1, 0.22, 1],
        },
    },
    collapse: {
        opacity: 0,
        x: "-50%",
        transition: {
            duration: 0.6,

            ease: [0.19, 1, 0.22, 1],
        },
    },
};
const profileVariants: Variants = {
    expand: cartVariants.expand,
    collapse: {
        opacity: 0,
        x: "50%",
        transition: {
            duration: 0.6,

            ease: [0.19, 1, 0.22, 1],
        },
    },
};

const MobileNav: FC = () => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");

    const {
        isMobileMenuOpen,
        isProductCartOpen,
        isProductAdded,
        isHelpOpen,
        toggleMobileMenu,
        closeProductCart,
        setProductNotAdded,
        closeHelp,
    } = useUI();

    const {
        isProductInfoOpen,
        closeProductInformation,
        isProductOverviewOpen,
    } = useProductInfo();

    const toggleMenu = () => {
        if (
            isProductCartOpen ||
            isProductAdded ||
            isProductInfoOpen ||
            isHelpOpen
        ) {
            closeProductCart();
            setProductNotAdded();
            closeProductInformation();
            closeHelp();
        } else toggleMobileMenu();
    };

    return (
        <>
            <MobileMenu />
            <MobileNavRoot
                initial={{ y: "100%", x: "-50%", opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.19, 1, 0.22, 1],
                }}
            >
                <MenuBtn
                    aria-label="Menu"
                    type="button"
                    onClick={toggleMenu}
                    $isMobileMenuOpen={isMobileMenuOpen}
                    $isUsernavOpen={isUsernavOpen}
                    $isProfileOpen={false}
                    $isPopupOpen={
                        isProductCartOpen ||
                        isProductAdded ||
                        isProductInfoOpen ||
                        isHelpOpen
                    }
                >
                    <motion.div
                        animate={
                            isMobileMenuOpen ||
                            isProductCartOpen ||
                            isProductInfoOpen ||
                            isHelpOpen
                                ? "openMenu"
                                : "closeMenu"
                        }
                        variants={menuBtnVariants}
                        transition={{ duration: 0.2 }}
                    >
                        {isMobileMenuOpen ||
                        isProductCartOpen ||
                        isProductAdded ||
                        isProductInfoOpen ||
                        isHelpOpen ? (
                            <Close />
                        ) : (
                            <HiOutlineMenuAlt3 />
                        )}
                    </motion.div>
                </MenuBtn>
                <Navigation>
                    <AnimatePresence>
                        {((!isProductCartOpen &&
                            !isProductAdded &&
                            !isProductInfoOpen &&
                            !isProductOverviewOpen &&
                            !isHelpOpen) ||
                            isMobileMenuOpen) && (
                            <>
                                <Cart
                                    key="cart"
                                    $isUsernavOpen={isUsernavOpen}
                                    $isMobileMenuOpen={isMobileMenuOpen}
                                    $isProfileOpen={false}
                                    initial="collapse"
                                    animate="expand"
                                    exit="collapse"
                                    variants={cartVariants}
                                >
                                    <Link href="/cart/bag" passHref>
                                        <button aria-label="Cart" type="button">
                                            <Bag />
                                        </button>
                                    </Link>
                                </Cart>
                                <Profile
                                    key="profile"
                                    $isProfileOpen={false}
                                    $isMobileMenuOpen={isMobileMenuOpen}
                                    $isUsernavOpen={isUsernavOpen}
                                    initial="collapse"
                                    animate="expand"
                                    exit="collapse"
                                    variants={profileVariants}
                                >
                                    <Link href="/cart/wishlist" passHref>
                                        <button
                                            aria-label="Profile"
                                            type="button"
                                        >
                                            <BsPerson />
                                        </button>
                                    </Link>
                                </Profile>
                            </>
                        )}
                    </AnimatePresence>
                </Navigation>
            </MobileNavRoot>
        </>
    );
};

export default MobileNav;
