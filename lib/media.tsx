// NOTE @artsy/fresnel library to handle responsive rendering for nextjs as to fix client-side and SSR mismatch.

import { createMedia } from "@artsy/fresnel";

const ExampleAppMedia = createMedia({
    breakpoints: {
        base: 0,
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        "2lg": 1125,
        xl: 1280,
        "2xl": 1500,
        "3xl": 1680,
        "4xl": 1800,
        "5xl": 1920,
    },
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
