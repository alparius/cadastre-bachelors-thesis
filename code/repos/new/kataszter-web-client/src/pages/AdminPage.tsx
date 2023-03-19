import React, { useState } from "react";

import AdminContainer from "../components/auth/AdminContainer";
import AdminController from "../components/auth/AdminController";
import IUser from "../data/user/User";
import IDecidePendingUserData, { NewUserUnderDecisionData } from "../data/user/UserUnderDecisionData";
import ILabelResponse from "../requests/response/LabelResponse";
import useDelete from "../requests/useDelete";
import useFetchData from "../requests/useFetchData";
import usePost from "../requests/usePost";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

interface IAdminPageProps {
    selfID: number | undefined;
}

const AdminPage: React.FC<IAdminPageProps> = (props: IAdminPageProps) => {
    const { selfID } = props;

    const { response: fetchResponse, loading, showError: fetchShowError } = useFetchData<IUser[]>(`/users`);
    const { response: smtpDown } = useFetchData<boolean>(`/smtpstatus`);

    const [userUnderDecision, setUserUnderDecision] = useState(NewUserUnderDecisionData);
    const { response: postResponse, showError: postShowError, asyncPost } = usePost<IDecidePendingUserData, ILabelResponse>(
        "/user/decide",
        userUnderDecision
    );

    const { response: deleteResponse, showError: deleteShowError, asyncDelete } = useDelete();

    const [activeMenu, setActiveMenu] = useState("all");

    return (
        <PageWrapperTwoColumns>
            <AdminController activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <AdminContainer
                activeMenu={activeMenu}
                users={fetchResponse}
                loading={loading}
                fetchShowError={fetchShowError}
                smtpDown={smtpDown}
                userUnderDecision={userUnderDecision}
                setUserUnderDecision={setUserUnderDecision}
                postResponse={postResponse}
                postShowError={postShowError}
                asyncPost={asyncPost}
                asyncDelete={asyncDelete}
                deleteResponse={deleteResponse}
                deleteShowError={deleteShowError}
                selfID={selfID}
            />
        </PageWrapperTwoColumns>
    );
};

export default AdminPage;
