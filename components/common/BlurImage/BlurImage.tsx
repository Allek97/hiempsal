// https://github.com/vercel/next.js/discussions/26168

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import cn from "clsx";

function BlurImage({ alt, className, ...props }: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            placeholder="blur"
            {...props}
            alt={alt}
            className={cn(
                className,
                "duration-700 ease-in-out",
                isLoading
                    ? "grayscale blur-2xl scale-110"
                    : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}

export default BlurImage;
