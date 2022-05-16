import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { FC } from "react";

import { useTouchDevice } from "@hooks";

import {
    mainPadding,
    mainPaddingLeft,
    mainPaddingRight,
    mainAbsoluteSides,
    mainLeftAbsolute,
    mainRightAbsolute,
} from "./utils/layout.styled";
import {
    textSizeHeader,
    textSizeMain,
    textSizeSmall,
    textSizeMedium,
} from "./utils/typography.styled";

const ThemeUIProvider: FC = ({ children }) => {
    const isDeviceTouch = useTouchDevice();

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
            textSizeMedium,
        },
        device: {
            isTouch: isDeviceTouch,
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeUIProvider;
