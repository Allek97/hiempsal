import { createTheme } from "@mui/material/styles";
import {
    mainPadding,
    mainPaddingLeft,
    mainPaddingRight,
    mainAbsoluteSides,
    mainLeftAbsolute,
    mainRightAbsolute,
} from "./layout.styled";
import {
    textSizeHeader,
    textSizeMain,
    textSizeSmall,
} from "./typography.styled";

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
        textSizeHeader,
        textSizeSmall,
    },
});

export default theme;
