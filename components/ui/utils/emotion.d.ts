/* eslint-disable import/no-duplicates */

import "@emotion/react";
import { SerializedStyles } from "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
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
    }
}
