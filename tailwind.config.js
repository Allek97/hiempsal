// tailwind.config.js
module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            maxWidth: {
                "8xl": "120rem" /* 1920px */,
            },
            colors: {
                primary: "var(--primary)",
                "primary-2": "var(--primary-2)",
                secondary: "var(--secondary)",
                "secondary-2": "var(--secondary-2)",
                hover: "var(--hover)",
                "hover-1": "var(--hover-1)",
                "hover-2": "var(--hover-2)",
                "accents-0": "var(--accents-0)",
                "accents-1": "var(--accents-1)",
                "accents-2": "var(--accents-2)",
                "accents-3": "var(--accents-3)",
                "accents-4": "var(--accents-4)",
                "accents-5": "var(--accents-5)",
                "accents-6": "var(--accents-6)",
                "accents-7": "var(--accents-7)",
                "accents-8": "var(--accents-8)",
                "accents-9": "var(--accents-9)",
                violet: "var(--violet)",
                "violet-light": "var(--violet-light)",
                pink: "var(--pink)",
                cyan: "var(--cyan)",
                blue: "var(--blue)",
                green: "var(--green)",
                red: "var(--red)",
                "orange-red": "var(--orange-red)",
                grey: "var(--grey)",
                "grey-light": "var(--grey-light)",
            },
            textColor: {
                base: "var(--text-base)",
                primary: "var(--text-primary)",
                secondary: "var(--text-secondary)",
            },
            screens: {
                xs: "30em",
                // => @media (min-width: 480px) { ... }

                sm: "40em",
                // => @media (min-width: 640px) { ... }

                md: "48em",
                // => @media (min-width: 768px) { ... }

                lg: "64em",
                // => @media (min-width: 1024px) { ... }

                "2lg": "70.3125em",
                // => @media (min-width: 1125px) { ... }

                xl: "80em",
                // => @media (min-width: 1280px) { ... }

                "2xl": "93.75em",
                // => @media (min-width: 1500px) { ... }

                "3xl": "105em",
                // => @media (min-width: 1680px) { ... }

                "4xl": "112.5em",
                // => @media (min-width: 1800px) { ... }

                "5xl": "120em",
                // => @media (min-width: 1920px) { ... }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
