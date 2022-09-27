import { Reset } from "@components/authentification";
import { Layout } from "@components/common";
import Seo from "@components/SEO";
import { DOMAIN } from "@framework/const";

const ResetPage = () => {
    return (
        <>
            <Seo
                title="Reset Password"
                description="Reset your current password with a new one."
                canonical={`${DOMAIN}/reset`}
            />
            <Reset />
        </>
    );
};
ResetPage.Variables = { isFooter: false, isNavbar: false, isMobileNav: false };
ResetPage.Layout = Layout;

export default ResetPage;
