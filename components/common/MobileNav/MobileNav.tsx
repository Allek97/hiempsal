import { FC, useState } from "react";
import { useUI } from "@components/ui/context";
import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import {
    Cart,
    MenuBtn,
    Navigation,
    Profile,
    MobileNavRoot,
} from "./MobileNav.styled";
import { MobileMenu } from "..";

const MobileNav: FC = () => {
    const { openCart } = useUI();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const manageMenu = () => {
        setIsMenuOpen((state) => !state);
    };

    return (
        <>
            {isMenuOpen && <MobileMenu />}
            <MobileNavRoot>
                <MenuBtn aria-label="Menu" type="button" onClick={manageMenu}>
                    <HiOutlineMenuAlt3 />
                </MenuBtn>
                <Navigation>
                    <Cart>
                        <button
                            aria-label="Cart"
                            type="button"
                            onClick={openCart}
                        >
                            <Bag />
                        </button>
                    </Cart>
                    <Profile>
                        <button aria-label="Profile" type="button">
                            <BsPerson />
                        </button>
                    </Profile>
                </Navigation>
            </MobileNavRoot>
        </>
    );
};

export default MobileNav;
