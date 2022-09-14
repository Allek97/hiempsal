import { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, Variants } from "framer-motion";

import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Close from "@components/icons/Close";
import { FaHeart } from "react-icons/fa";

import { useUI } from "@components/ui/context";
import { useProduct } from "@components/product/context";

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

interface Props {
    cartSize: number;
    wishlistSize: number;
    customerPendingOrders: number;
}

const MobileNav: FC<Props> = ({
    cartSize,
    wishlistSize,
    customerPendingOrders,
}) => {
    const router = useRouter();
    const isUsernavOpen: boolean = router.pathname.includes("cart");
    const isProfileOpen: boolean =
        router.pathname.includes("authentification") ||
        router.pathname.includes("account");

    const {
        isMobileMenuOpen,
        isProductCartOpen,
        isProductAdded,
        isHelpOpen,
        isReviewOpen,
        openMobileMenu,
        closeMobileMenu,
        closeProductCart,
        setProductNotAdded,
        closeHelp,
        closeReview,
    } = useUI();

    const {
        isProductInfoOpen,
        closeProductInformation,
        isProductOverviewOpen,
    } = useProduct();

    const toggleMenu = () => {
        if (
            isProductCartOpen ||
            isProductAdded ||
            isProductInfoOpen ||
            isHelpOpen ||
            isReviewOpen
        ) {
            closeProductCart();
            setProductNotAdded();
            closeProductInformation();
            closeHelp();
            closeReview();
        } else if (isMobileMenuOpen) closeMobileMenu();
        else openMobileMenu();
    };

    const isNavigationOpen: boolean = useMemo(
        () =>
            (!isProductCartOpen &&
                !isProductAdded &&
                !isProductInfoOpen &&
                !isProductOverviewOpen &&
                !isHelpOpen &&
                !isReviewOpen) ||
            isMobileMenuOpen,
        [
            isHelpOpen,
            isMobileMenuOpen,
            isProductAdded,
            isProductCartOpen,
            isProductInfoOpen,
            isProductOverviewOpen,
            isReviewOpen,
        ]
    );

    const isNavOpen: boolean = useMemo(
        () =>
            isMobileMenuOpen ||
            isProductCartOpen ||
            isProductAdded ||
            isProductInfoOpen ||
            isHelpOpen ||
            isReviewOpen,
        [
            isHelpOpen,
            isMobileMenuOpen,
            isProductAdded,
            isProductCartOpen,
            isProductInfoOpen,
            isReviewOpen,
        ]
    );

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
                    $isProfileOpen={isProfileOpen}
                    $isPopupOpen={
                        isProductCartOpen ||
                        isProductAdded ||
                        isProductInfoOpen ||
                        isHelpOpen ||
                        isReviewOpen
                    }
                >
                    <motion.div
                        animate={isNavOpen ? "openMenu" : "closeMenu"}
                        variants={menuBtnVariants}
                        transition={{ duration: 0.2 }}
                    >
                        {isNavOpen ? <Close /> : <HiOutlineMenuAlt3 />}
                    </motion.div>
                </MenuBtn>
                <Navigation>
                    <AnimatePresence>
                        {isNavigationOpen && (
                            <>
                                <Cart
                                    key="cart"
                                    $isUsernavOpen={isUsernavOpen}
                                    $isMobileMenuOpen={isMobileMenuOpen}
                                    $isProfileOpen={isProfileOpen}
                                    initial="collapse"
                                    animate="expand"
                                    exit="collapse"
                                    variants={cartVariants}
                                    onClick={closeMobileMenu}
                                >
                                    <Link href="/cart/bag" passHref>
                                        <button aria-label="Cart" type="button">
                                            <Bag />
                                            {cartSize > 0 && (
                                                <span>{cartSize}</span>
                                            )}
                                            {wishlistSize > 0 && <FaHeart />}
                                        </button>
                                    </Link>
                                </Cart>
                                <Profile
                                    key="profile"
                                    $isProfileOpen={isProfileOpen}
                                    $isMobileMenuOpen={isMobileMenuOpen}
                                    $isUsernavOpen={isUsernavOpen}
                                    initial="collapse"
                                    animate="expand"
                                    exit="collapse"
                                    variants={profileVariants}
                                    onClick={closeMobileMenu}
                                >
                                    <Link href="/account/overview" passHref>
                                        <button
                                            aria-label="Profile"
                                            type="button"
                                        >
                                            <BsPerson />
                                            <span>
                                                {customerPendingOrders > 0 &&
                                                    customerPendingOrders}
                                            </span>
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
