import { Layout } from "@components/common";
import { Authentification } from "@components/authentification";

const AuthentificationPage = () => {
    return <Authentification />;
};
AuthentificationPage.Variables = { isFooter: false };
AuthentificationPage.Layout = Layout;

export default AuthentificationPage;
