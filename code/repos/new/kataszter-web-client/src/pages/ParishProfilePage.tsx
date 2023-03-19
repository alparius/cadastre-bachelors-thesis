import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import ParishProfileContainer from "../components/parish-profile/ParishProfileContainer";
import ParishProfileController from "../components/parish-profile/ParishProfileController";
import ParishProfileTab from "../data/enums/ParishProfileTab";
import UserRole from "../data/enums/UserRole";
import IParishGeneralData from "../data/parish/ParishGeneralData";
import ILabelResponse from "../requests/response/LabelResponse";
import useDelete from "../requests/useDelete";
import useDeleteFile from "../requests/useDeleteFile";
import useFetchData from "../requests/useFetchData";
import usePostFiles from "../requests/usePostFiles";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

interface IParishProfilePageProps {
    parishID: number;
    userRole: UserRole | undefined;
}

const ParishProfilePage: React.FC<IParishProfilePageProps> = (props: IParishProfilePageProps) => {
    const { parishID, userRole } = props;

    // const params = new URLSearchParams(window.location.search);
    const initCurrentTab: string = /*params.get("tab") ||*/ ParishProfileTab.general;
    const [currentTab, setCurrentTab] = useState(initCurrentTab);

    const [files, setFiles] = useState();
    const [fileType, setFileType] = useState();
    const [parish, setParish] = useState();
    const [editMode, setEditMode] = useState(false);

    const { response, loading, showError } = useFetchData<IParishGeneralData>(`/parish/${parishID}`);
    const { responsePostFile, errorStatusPostFile, asyncPostFile } = usePostFiles<FileList, IParishGeneralData>(
        `/parishes/${parishID}/${fileType}`,
        `${fileType}[]`,
        files
    );
    const { errorStatusDeleteFile, asyncDeleteFile } = useDeleteFile();
    const { response: deleteResponse, showError: showDeleteError, asyncDelete } = useDelete();

    useEffect(() => {
        if (!deleteResponse) {
            if (response) {
                setParish(response);
            }
            if (parish) {
                setParish(parish);
            }
            // WHAT IS THIS?
            // if (responsePostFile) {
            //     setParish(responsePostFile);
            // }
        }
    }, [parish, response, deleteResponse]);

    return (
        <>
            {deleteResponse && (deleteResponse as ILabelResponse).label.startsWith("info") && <Redirect to="/parishes/search" />}
            {parish && <Redirect to={`/parishes/profile/${parish.ID}?&tab=${currentTab}`} />}

            <PageWrapperTwoColumns>
                <ParishProfileController currentTab={currentTab} setCurrentTab={setCurrentTab} editMode={editMode} />
                <ParishProfileContainer
                    responsePostFile={responsePostFile}
                    currentTab={currentTab}
                    parish={parish}
                    setParish={setParish}
                    loading={loading}
                    showError={showError}
                    errorStatusPostFile={errorStatusPostFile}
                    errorStatusDeleteFile={errorStatusDeleteFile}
                    setFiles={setFiles}
                    setFileType={setFileType}
                    asyncPostFile={asyncPostFile}
                    asyncDeleteFile={asyncDeleteFile}
                    userRole={userRole}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    asyncDelete={asyncDelete}
                    showDeleteError={showDeleteError}
                    deleteResponse={deleteResponse}
                />
            </PageWrapperTwoColumns>
        </>
    );
};

export default ParishProfilePage;
