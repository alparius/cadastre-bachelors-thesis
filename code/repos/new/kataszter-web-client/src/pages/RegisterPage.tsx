import React, { useState } from "react";
import { Redirect } from "react-router";

import RegisterForm from "../components/auth/RegisterForm";
import ErrorMsg from "../components/ErrorMsg";
import { NewRegisterUserData } from "../data/user/RegisterUserData";
import useRegister from "../requests/useRegister";
import PageWrapperOneColumn from "./PageWrapperOneColumn";

const RegisterPage: React.FC = () => {
    const [user, setUser] = useState(NewRegisterUserData);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const { response, showError, postRegister, setResponse } = useRegister({ ...user, password2: undefined });

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response && response.label.startsWith("info")) {
        return <Redirect to="/login" />;
    } else {
        return (
            <PageWrapperOneColumn>
                <RegisterForm
                    user={user}
                    setUser={setUser}
                    response={response}
                    recaptchaToken={recaptchaToken}
                    postRegister={postRegister}
                    setResponse={setResponse}
                    setRecaptchaToken={setRecaptchaToken}
                />
            </PageWrapperOneColumn>
        );
    }
};

export default RegisterPage;
