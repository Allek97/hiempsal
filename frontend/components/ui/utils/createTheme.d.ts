/* eslint-disable import/no-duplicates */
import { SerializedStyles } from "@emotion/react";
import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface CustomTheme extends Theme {
        layout: {
            mainPadding: SerializedStyles;
            mainPaddingLeft: SerializedStyles;
            mainPaddingRight: SerializedStyles;
            mainAbsoluteSides: SerializedStyles;
            mainLeftAbsolute: SerializedStyles;
            mainRightAbsolute: SerializedStyles;
        };
        textSize: {
            textSizeMain: SerializedStyles;
        };
        device: {
            isTouch: boolean;
        };
    }
    // allow configuration using `createTheme`
    interface CustomThemeOptions extends ThemeOptions {
        layout?: {
            mainPadding: SerializedStyles;
            mainPaddingLeft: SerializedStyles;
            mainPaddingRight: SerializedStyles;
            mainAbsoluteSides: SerializedStyles;
            mainLeftAbsolute: SerializedStyles;
            mainRightAbsolute: SerializedStyles;
        };
        textSize: {
            textSizeMain: SerializedStyles;
            textSizeHeader: SerializedStyles;
            textSizeSmall: SerializedStyles;
            textSizeMedium: SerializedStyles;
            textSizeLarge: SerializedStyles;
        };
        device: {
            isTouch: boolean;
        };
    }
    // eslint-disable-next-line no-unused-vars
    export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
