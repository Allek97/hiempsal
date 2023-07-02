const Test = ({ ...props }) => {
    return (
        <svg
            className="CutCornerBackground_svg__c2xAh StickyBuyButton_cutCorner__cQXRq"
            viewBox="0 0 418 63"
            style={{ fill: "red" }}
            {...props}
        >
            <filter id="inset-shadow">
                <feOffset dx="0" dy="-2" result="offsetblur" />
                <feFlood floodColor="rgb(255, 255, 255)" result="color" />
                <feComposite in2="SourceAlpha" operator="out" />
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in2="offsetblur" operator="in" />
                <feComposite operator="atop" in2="SourceGraphic" />
            </filter>
            <path
                className="CutCornerBackground_path__yZ9kP"
                d="M 0 0 H 403 q 2.33 0 4.25 1.76 l 4.33 4.34 Q 418 13 418 15 V 63 H 0 Z"
            />
        </svg>
    );
};

export default Test;
