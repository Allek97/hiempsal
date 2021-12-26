import { FC } from "react";
import { useUI } from "@components/ui/context";
import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {
    Cart,
    MenuBtn,
    Navigation,
    Profile,
    MobileMenuRoot,
} from "./MobileMenu.styled";

const MobileMenu: FC = () => {
    const { openCart } = useUI();
    return (
        <MobileMenuRoot>
            <MenuBtn aria-label="Menu" type="button">
                <HiOutlineMenuAlt3 />
            </MenuBtn>
            <Navigation>
                <Cart>
                    <button aria-label="Cart" type="button" onClick={openCart}>
                        <Bag />
                    </button>
                </Cart>
                <Profile>
                    <button aria-label="Profile" type="button">
                        <BsPerson />
                    </button>
                </Profile>
            </Navigation>
        </MobileMenuRoot>
    );
};

export default MobileMenu;
