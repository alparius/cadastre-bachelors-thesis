import React, { useState } from "react";

import { FormattedMessage as FM } from "react-intl";
import NewPasswordForm from "../components/auth/NewPasswordForm";
import ErrorMsg from "../components/ErrorMsg";
import { NewPasswordData } from "../data/user/NewPasswordData";
import useFetchData from "../requests/useFetchData";
import PageWrapperOneColumn from "./PageWrapperOneColumn";

const NewPasswordPage: React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    const tokenId: string = params.get("id") || "";
    const [password, setPassword] = useState({ ...NewPasswordData, id: tokenId });
    const { response, showError } = useFetchData<boolean>(`/newPassword/${tokenId}`);

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response === false) {
        return (
            <PageWrapperOneColumn>
                <FM id="error.tokenExpired" />
            </PageWrapperOneColumn>
        );

    } else {
        return (
            <PageWrapperOneColumn>
                <NewPasswordForm password={password} setPassword={setPassword} tokenId={tokenId} />
            </PageWrapperOneColumn>
        );
    }
};

export default NewPasswordPage;
