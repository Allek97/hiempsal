import Document, { Html, Head, Main, NextScript } from "next/document";
import { mediaStyles } from "../lib/media";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <style
                        type="text/css"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: mediaStyles }}
                    />
                    {/* eslint-disable-next-line @next/next/no-css-tags */}
                    <link
                        rel="stylesheet"
                        href="/fonts/HelveticaNowText/style.css"
                    />
                    {/* eslint-disable-next-line @next/next/no-css-tags */}
                    <link
                        rel="stylesheet"
                        href="/fonts/Whytelnktrap/style.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
