import { Variants } from "framer-motion";

const formMotion: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.45,
            delay: 0.1,
        },
    },
    exit: {
        height: 0,
        transition: { duration: 1 },
    },
};

export { formMotion };
