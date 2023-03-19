import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import PriestProfileContainer from "../components/priest-profile/PriestProfileContainer";
import PriestProfileController from "../components/priest-profile/PriestProfileController";
import PriestProfileTab from "../data/enums/PriestProfileTab";
import UserRole from "../data/enums/UserRole";
import IPriestProfileData from "../data/priest/PriestProfileData";
import ILabelResponse from "../requests/response/LabelResponse";
import useDelete from "../requests/useDelete";
import useDeleteFile from "../requests/useDeleteFile";
import useFetchData from "../requests/useFetchData";
import usePostFiles from "../requests/usePostFiles";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

interface IPriestProfilePageProps {
    priestID: number;
    userRole: UserRole | undefined;
}

const PriestProfilePage: React.FC<IPriestProfilePageProps> = (props: IPriestProfilePageProps) => {
    const { priestID, userRole } = props;

    const params = new URLSearchParams(window.location.search);
    const initCurrentTab: string =
        params.get("tab") && (params.get("tab") === PriestProfileTab.files || params.get("tab") === PriestProfileTab.pictures)
            ? PriestProfileTab.general
            : params.get("tab") || PriestProfileTab.general;
    const [currentTab, setCurrentTab] = useState(initCurrentTab);
    const [files, setFiles] = useState();
    const [fileType, setFileType] = useState();

    const { response, loading, showError } = useFetchData<IPriestProfileData>(`/priest/${priestID}`);
    const { responsePostFile, errorStatusPostFile, asyncPostFile } = usePostFiles<FileList, IPriestProfileData>(
        `/priests/${priestID}/${fileType}`,
        `${fileType}[]`,
        files
    );
    const { errorStatusDeleteFile, asyncDeleteFile } = useDeleteFile();
    const { response: deleteResponse, showError: showDeleteError, asyncDelete } = useDelete();

    const [priest, setPriest] = useState(response);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!deleteResponse) {
            if (response) {
                setPriest(response);
            }
            if (priest) {
                setPriest(priest);
            }
        }
    }, [priest, response, deleteResponse]);

    return (
        <>
            {deleteResponse && (deleteResponse as ILabelResponse).label.startsWith("info") && <Redirect to="/priests/search" />}
            {priest && <Redirect to={`/priests/profile/${priest.ID}?&tab=${currentTab}`} />}

            <PageWrapperTwoColumns>
                <PriestProfileController currentTab={currentTab} setCurrentTab={setCurrentTab} editMode={editMode} />
                <PriestProfileContainer
                    responsePostFile={responsePostFile}
                    currentTab={currentTab}
                    priest={priest}
                    setPriest={setPriest}
                    loading={loading}
                    showError={showError}
                    errorStatusPostFile={errorStatusPostFile}
                    asyncPostFile={asyncPostFile}
                    errorStatusDeleteFile={errorStatusDeleteFile}
                    asyncDeleteFile={asyncDeleteFile}
                    setFiles={setFiles}
                    setFileType={setFileType}
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

export default PriestProfilePage;
