import { Layout } from "@components/common";
import { Authentification } from "@components/authentification";
import getCustomer from "@framework/customer/get-customer";
import { getConfig } from "@framework/api/config";
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "@framework/const";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const config = getConfig();
        const customerAccessToken: string | undefined =
            context.req.cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE];
        const customer = await getCustomer({ config, customerAccessToken });

        if (customer) {
            return {
                redirect: {
                    destination: "/account/overview",
                    permanent: false,
                },
            };
        }
        context.res.setHeader("Set-Cookie", [
            `${SHOPIFY_CUSTOMER_TOKEN_COOKIE}=deleted; Max-Age=0`,
        ]);
        return {
            props: {},
        };
    } catch (err) {
        return {
            props: {},
        };
    }
};

const AuthentificationPage = () => {
    return <Authentification />;
};
AuthentificationPage.Variables = { isFooter: false };
AuthentificationPage.Layout = Layout;

export default AuthentificationPage;
