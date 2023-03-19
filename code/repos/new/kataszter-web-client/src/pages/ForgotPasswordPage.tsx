import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import ErrorMsg from "../components/ErrorMsg";
import IForgotPasswordData, { NewForgotPasswordData } from "../data/user/ForgotPasswordData";
import ILabelResponse from "../requests/response/LabelResponse";
import usePost from "../requests/usePost";
import PageWrapperOneColumn from "./PageWrapperOneColumn";

const ForgotPasswordPage: React.FC = () => {
    const [emailData, setEmailData] = useState(NewForgotPasswordData);

    const { response, showError, asyncPost } = usePost<IForgotPasswordData, ILabelResponse>("/forgotPassword", { ...emailData });

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response && response.label.startsWith("info")) {
        return <Redirect to="/login" />;
    } else {
        return (
            <PageWrapperOneColumn>
                <ForgotPasswordForm emailData={emailData} setUser={setEmailData} response={response} asyncPost={asyncPost} />
            </PageWrapperOneColumn>
        );
    }
};

export default ForgotPasswordPage;
