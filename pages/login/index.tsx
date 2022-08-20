import { Layout } from "@components/common";
import { Login } from "@components/login";

const LoginPage = () => {
    return <Login />;
};
LoginPage.Variables = { isFooter: false };
LoginPage.Layout = Layout;

export default LoginPage;
