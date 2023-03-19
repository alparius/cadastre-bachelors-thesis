import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import ErrorMsg from "../components/ErrorMsg";
import { NewLoginUserData } from "../data/user/LoginUserData";
import IUser from "../data/user/User";
import useLogin from "../requests/useLogin";
import PageWrapperOneColumn from "./PageWrapperOneColumn";

interface ILoginPageProps {
    user: IUser | undefined;
    setUser(newUser: IUser): void;
}

const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) => {
    const { user, setUser } = props;

    const [loginUserData, setLoginUserData] = useState(NewLoginUserData);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const { response, showError, postLogin } = useLogin(loginUserData, setUser);

    if (user) {
        return <Redirect to="/" />;
    } else {
        if (showError) {
            return <ErrorMsg errorMessage="error.connection" />;
        } else if (response && response.label.startsWith("info")) {
            return <Redirect to="/" />;
        } else {
            return (
                <PageWrapperOneColumn>
                    <LoginForm
                        loginUserData={loginUserData}
                        setLoginUserData={setLoginUserData}
                        recaptchaToken={recaptchaToken}
                        setRecaptchaToken={setRecaptchaToken}
                        postLogin={postLogin}
                        response={response}
                    />
                </PageWrapperOneColumn>
            );
        }
    }
};

export default LoginPage;
