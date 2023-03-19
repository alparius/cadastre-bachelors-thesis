import React, { useEffect, useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, List, Message, Responsive } from "semantic-ui-react";

import ParishProfileTab from "../../data/enums/ParishProfileTab";
import UserRole from "../../data/enums/UserRole";
import IParishGeneralData from "../../data/parish/ParishGeneralData";
import IParishPastName from "../../data/parish/ParishPastName";
import doPut from "../../requests/doPut";
import ILabelResponse from "../../requests/response/LabelResponse";
import "../../static/priestProfile.css";
import checkDate from "../../util/dateConverts/checkDate";
import BoldFM from "../../util/styledMessages/BoldFM";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import isAdmin from "../../util/userRoles/userRoleUtil";
import EditModeControlLabel from "../EditModeControlLabel";
import ErrorMsg from "../ErrorMsg";
import ProfilePlaceholder from "../ProfilePlaceholder";
import ParishProfileFileContainer, { ParishProfileFileType } from "./parish-file-container/ParishProfileFileContainer";
import ParishGeneralDataContainer from "./parish-general-data/ParishGeneralDataContainer";
import ParishProfileHeader from "./ParishProfileHeader";

interface IParishProfileContainerProps {
    responsePostFile: IParishGeneralData | undefined;
    currentTab: string;
    parish: IParishGeneralData | undefined;
    loading: boolean;
    editMode: boolean;
    showError: boolean;
    errorStatusPostFile: number;
    errorStatusDeleteFile: number;
    userRole: UserRole | undefined;
    showDeleteError: boolean;
    deleteResponse: ILabelResponse | undefined;
    setFiles(newFiles: FileList): void;
    setFileType(newFileType: string): void;
    setParish(newParish: IParishGeneralData): void;
    asyncPostFile(): void;
    asyncDeleteFile(url: string): void;
    setEditMode(newEditMode: boolean): void;
    asyncDelete(url: string): void;
}

const ParishProfileContainer: React.FC<IParishProfileContainerProps> = (props: IParishProfileContainerProps) => {
    const {
        responsePostFile,
        currentTab,
        parish,
        loading,
        showError,
        errorStatusPostFile,
        setParish,
        userRole,
        showDeleteError,
        deleteResponse,
        editMode,
        setEditMode,
        setFiles,
        setFileType,
        asyncPostFile,
        errorStatusDeleteFile,
        asyncDeleteFile,
        asyncDelete
    } = props;

    const [parishCopy, setParishCopy] = useState();

    useEffect(() => {
        if (!editMode) {
            if (!parish) {
                setParishCopy(parish);
            } else {
                const parishDeepCopy: IParishGeneralData = JSON.parse(JSON.stringify(parish));
                if (responsePostFile) {
                    parishDeepCopy.files = responsePostFile.files;
                    parishDeepCopy.pictures = responsePostFile.pictures;
                }
                if (JSON.stringify(parishCopy) !== JSON.stringify(parishDeepCopy)) {
                    setParishCopy(parishDeepCopy);
                }
            }
        } else {
            if (responsePostFile) {
                const parishDeepCopy: IParishGeneralData = JSON.parse(JSON.stringify(parishCopy));
                parishDeepCopy.files = responsePostFile.files;
                parishDeepCopy.pictures = responsePostFile.pictures;
                if (JSON.stringify(parishCopy) !== JSON.stringify(parishDeepCopy)) {
                    setParishCopy(parishDeepCopy);
                }
            }
        }
    }, [parish, editMode, responsePostFile, parishCopy]);

    const [dateErrors, setDateErrors] = useState([] as string[]);
    const [parishNameError, setParishNameError] = useState(false);

    const handleEditModeChange = (_: any, { value }: any) => setEditMode(value);

    const handleSaveChanges = () => {
        if (parishCopy && parishCopy.pastNames) {
            parishCopy.pastNames = parishCopy.pastNames.filter((pastName: IParishPastName) => pastName.name);
        }

        const newErrors: string[] = checkAllDates();

        if (parishCopy && parishCopy.name === "") {
            setParishNameError(true);
            setDateErrors(newErrors);
        } else if (newErrors.length === 0) {
            setParishNameError(false);
            if (parish) {
                doPut("/parish", parishCopy);
            }
            setDateErrors([] as string[]);
            setParish(parishCopy);
            setEditMode(false);
        } else {
            setParishNameError(false);
            setDateErrors(newErrors);
        }
    };

    const checkAllDates = () => {
        const badDates: string[] = [];

        if (!parishCopy || !parish) {
            return badDates;
        }

        if (parishCopy.pastNames) {
            for (const pn of parishCopy.pastNames) {
                if (!checkDate(pn.startDate) || !checkDate(pn.endDate)) {
                    badDates.push("pastNames");
                    break;
                }
            }
        }

        return badDates;
    };

    const handleRevertChanges = () => {
        setDateErrors([] as string[]);
        setParishNameError(false);
        setEditMode(false);
    };

    if (showError || showDeleteError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !parish) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                {editMode && (
                    <>
                        <EditModeControlLabel text="profile.editModeText" onSave={handleSaveChanges} onRevertChanges={handleRevertChanges} />
                        <Responsive as={Divider} minWidth={769} style={{ marginTop: "4em" }} />
                    </>
                )}
                {deleteResponse && deleteResponse.label.startsWith("error") && (
                    <Message negative>
                        <FM id={deleteResponse.label} />
                    </Message>
                )}
                {(parishNameError || dateErrors.length !== 0) && (
                    <Message negative>
                        <div style={{ marginBottom: "1em" }}>
                            <BoldFM id={"formError.profileError"} />
                        </div>
                        {parishNameError && (
                            <div style={{ marginBottom: "1em" }}>
                                <FM id={"formError.priestName"} />
                            </div>
                        )}
                        {dateErrors.length !== 0 && (
                            <>
                                <ItalicFM showColon id="formError.datePlaces" />
                                <List bulleted>
                                    {dateErrors.map((msgID: string) => (
                                        <List.Item key={msgID}>
                                            <FM id={"profile." + msgID} />
                                        </List.Item>
                                    ))}
                                </List>
                            </>
                        )}
                    </Message>
                )}
                <ParishProfileHeader
                    parish={parishCopy}
                    setParish={setParishCopy}
                    editMode={editMode}
                    isAdmin={isAdmin(userRole)}
                    asyncDelete={asyncDelete}
                    handleEditModeChange={handleEditModeChange}
                />
                <Divider />
                {(() => {
                    const parishProfileProps = { parish: parishCopy, loading, showError, editMode, setParish: setParishCopy };
                    switch (currentTab) {
                        case ParishProfileTab.pictures && false: {
                            return (
                                <ParishProfileFileContainer
                                    {...parishProfileProps}
                                    fileType={ParishProfileFileType.Picture}
                                    errorStatusPostFile={errorStatusPostFile}
                                    errorStatusDeleteFile={errorStatusDeleteFile}
                                    setFiles={setFiles}
                                    setFileType={setFileType}
                                    asyncPostFile={asyncPostFile}
                                    asyncDeleteFile={asyncDeleteFile}
                                />
                            );
                        }
                        case ParishProfileTab.files && false: {
                            return (
                                <ParishProfileFileContainer
                                    {...parishProfileProps}
                                    fileType={ParishProfileFileType.File}
                                    errorStatusPostFile={errorStatusPostFile}
                                    errorStatusDeleteFile={errorStatusPostFile}
                                    setFiles={setFiles}
                                    setFileType={setFileType}
                                    asyncPostFile={asyncPostFile}
                                    asyncDeleteFile={asyncDeleteFile}
                                />
                            );
                        }
                        default: {
                            return <ParishGeneralDataContainer {...parishProfileProps} />;
                        }
                    }
                })()}
            </>
        );
    }
};

export default ParishProfileContainer;
