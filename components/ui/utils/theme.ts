import { createTheme } from "@mui/material/styles";
import {
    mainPadding,
    mainPaddingLeft,
    mainPaddingRight,
    mainAbsoluteSides,
    mainLeftAbsolute,
    mainRightAbsolute,
} from "./layout.styled";
import { textSizeMain } from "./typography.styled";

const theme = createTheme({
    layout: {
        mainPadding,
        mainPaddingLeft,
        mainPaddingRight,
        mainAbsoluteSides,
        mainLeftAbsolute,
        mainRightAbsolute,
    },
    textSize: {
        textSizeMain,
    },
});

export default theme;
