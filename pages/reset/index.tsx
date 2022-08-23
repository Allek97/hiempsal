import { Reset } from "@components/authentification";
import { Layout } from "@components/common";

const ResetPage = () => {
    return <Reset />;
};
ResetPage.Variables = { isFooter: false, isNavbar: false, isMobileNav: false };
ResetPage.Layout = Layout;

export default ResetPage;
