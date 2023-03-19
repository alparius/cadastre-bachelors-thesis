import React, { useEffect, useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, List, Message, Responsive } from "semantic-ui-react";

import PriestProfileTab from "../../data/enums/PriestProfileTab";
import UserRole from "../../data/enums/UserRole";
import IChild from "../../data/priest/Child";
import IDisciplinaryMatter from "../../data/priest/DisciplinaryMatter";
import ILiteraryWork from "../../data/priest/LiteraryWork";
import IOffice from "../../data/priest/Office";
import IPlacement from "../../data/priest/Placement";
import IPriestProfileData from "../../data/priest/PriestProfileData";
import IPriestReference from "../../data/priest/PriestReference";
import IQualification from "../../data/priest/Qualification";
import ISpouse from "../../data/priest/Spouse";
import ISuspension from "../../data/priest/Suspension";
import doPut from "../../requests/doPut";
import ILabelResponse from "../../requests/response/LabelResponse";
import checkDate from "../../util/dateConverts/checkDate";
import BoldFM from "../../util/styledMessages/BoldFM";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import isAdmin from "../../util/userRoles/userRoleUtil";
import CardPlaceholder from "../CardPlaceholder";
import EditModeControlLabel from "../EditModeControlLabel";
import ErrorMsg from "../ErrorMsg";
import PriestDisciplinaryMattersContainer from "./priest-disciplinary-matters/PriestDisciplinaryMattersContainer";
import PriestFamilyContainer from "./priest-family/PriestFamilyContainer";
import PriestProfileFileContainer, { PriestProfileFileType } from "./priest-files-container/PriestProfileFileContainer";
import PriestGeneralDataContainer from "./priest-general-data/PriestGeneralDataContainer";
import PriestLifepathContainer from "./priest-lifepath/PriestLifepathContainer";
import PriestNotesContainer from "./priest-notes/PriestNotesContainer";
import PriestOccupationContainer from "./priest-occupation/PriestOccupationContainer";
import PriestPlacementContainer from "./priest-placements/PriestPlacementContainer";
import PriestQualificationContainer from "./priest-qualification/PriestQualificationContainer";
import PriestReferencesContainer from "./priest-references/PriestReferencesContainer";
import PriestProfileHeader from "./PriestProfileHeader";

interface IPriestProfileContainerProps {
    responsePostFile: IPriestProfileData | undefined;
    currentTab: string;
    priest: IPriestProfileData | undefined;
    loading: boolean;
    showError: boolean;
    errorStatusPostFile: number;
    errorStatusDeleteFile: number;
    editMode: boolean;
    userRole: UserRole | undefined;
    showDeleteError: boolean;
    deleteResponse: ILabelResponse | undefined;
    setFiles(newFiles: FileList): void;
    setFileType(newFileType: string): void;
    asyncPostFile(): void;
    asyncDeleteFile(url: string): void;
    setPriest(newPriest: IPriestProfileData): void;
    setEditMode(newEditMode: boolean): void;
    asyncDelete(url: string): void;
}

const PriestProfileContainer: React.FC<IPriestProfileContainerProps> = (props: IPriestProfileContainerProps) => {
    const {
        responsePostFile,
        currentTab,
        priest,
        loading,
        showError,
        errorStatusPostFile,
        errorStatusDeleteFile,
        setPriest,
        userRole,
        showDeleteError,
        deleteResponse,
        editMode,
        setEditMode,
        setFiles,
        setFileType,
        asyncPostFile,
        asyncDeleteFile,
        asyncDelete
    } = props;

    const [priestCopy, setPriestCopy] = useState();

    const handleEditModeChange = (_: any, { value }: any) => setEditMode(value);

    useEffect(() => {
        if (!editMode) {
            if (!priest) {
                setPriestCopy(priest);
            } else {
                const priestDeepCopy: IPriestProfileData = JSON.parse(JSON.stringify(priest));
                if (responsePostFile) {
                    priestDeepCopy.files = responsePostFile.files;
                    priestDeepCopy.pictures = responsePostFile.pictures;
                }
                if (JSON.stringify(priestCopy) !== JSON.stringify(priestDeepCopy)) {
                    setPriestCopy(priestDeepCopy);
                }
            }
        } else {
            if (responsePostFile) {
                const priestDeepCopy: IPriestProfileData = JSON.parse(JSON.stringify(priestCopy));
                priestDeepCopy.files = responsePostFile.files;
                priestDeepCopy.pictures = responsePostFile.pictures;
                if (JSON.stringify(priestCopy) !== JSON.stringify(priestDeepCopy)) {
                    setPriestCopy(priestDeepCopy);
                }
            }
        }
    }, [priest, editMode, responsePostFile, priestCopy]);

    const [dateErrors, setDateErrors] = useState([] as string[]);
    const [priestNameError, setPriestNameError] = useState(false);

    const handleSaveChanges = () => {
        if (priestCopy && priestCopy.children) {
            priestCopy.children = priestCopy.children.filter((child: IChild) => child.name);
        }
        if (priestCopy && priestCopy.spouses) {
            priestCopy.spouses = priestCopy.spouses.filter((spouse: ISpouse) => spouse.name);
        }
        if (priestCopy && priestCopy.qualifications) {
            priestCopy.qualifications = priestCopy.qualifications.filter((qualification: IQualification) => qualification.diplomaName);
        }
        if (priestCopy && priestCopy.assistantPriestPlaces) {
            priestCopy.assistantPriestPlaces = priestCopy.assistantPriestPlaces.filter((app: IPlacement) => app.place);
        }
        if (priestCopy && priestCopy.mainPriestPlaces) {
            priestCopy.mainPriestPlaces = priestCopy.mainPriestPlaces.filter((mpp: IPlacement) => mpp.place);
        }
        if (priestCopy && priestCopy.churchOffices) {
            priestCopy.churchOffices = priestCopy.churchOffices.filter((cf: IOffice) => cf.name);
        }
        if (priestCopy && priestCopy.otherOffices) {
            priestCopy.otherOffices = priestCopy.otherOffices.filter((of: IOffice) => of.name);
        }
        if (priestCopy && priestCopy.literaryWorks) {
            priestCopy.literaryWorks = priestCopy.literaryWorks.filter((lw: ILiteraryWork) => lw.title);
        }
        if (priestCopy && priestCopy.priestReferences) {
            priestCopy.priestReferences = priestCopy.priestReferences.filter((pr: IPriestReference) => pr.place);
        }
        if (priestCopy && priestCopy.disciplinaryMatters) {
            priestCopy.disciplinaryMatters = priestCopy.disciplinaryMatters.filter((dm: IDisciplinaryMatter) => dm.name);
        }
        if (priestCopy && priestCopy.suspensions) {
            priestCopy.suspensions = priestCopy.suspensions.filter((sps: ISuspension) => sps.punishment);
        }

        const newErrors: string[] = checkAllDates();

        if (priestCopy && priestCopy.name === "") {
            setPriestNameError(true);
            setDateErrors(newErrors);
        } else if (newErrors.length === 0) {
            setPriestNameError(false);
            if (priest) {
                doPut("/priest", priestCopy);
            }
            setDateErrors([] as string[]);
            setPriest(priestCopy);
            setEditMode(false);
        } else {
            setPriestNameError(false);
            setDateErrors(newErrors);
        }
    };

    const checkAllDates = () => {
        const badDates: string[] = [];

        if (!priestCopy || !priest) {
            return badDates;
        }

        ["birthDate", "deathDate", "subscriptionDate", "graduationDate", "retirementDate", "fired", "resigned"].forEach((date) => {
            if (!checkDate(priestCopy[date])) {
                badDates.push(date);
            }
        });

        if (priestCopy.children) {
            for (const child of priestCopy.children) {
                if (!checkDate(child.birthDate)) {
                    badDates.push("children");
                    break;
                }
            }
        }
        if (priestCopy.spouses) {
            for (const spouse of priestCopy.spouses) {
                if (!checkDate(spouse.birthDate) || !checkDate(spouse.marriageDate)) {
                    badDates.push("spouses");
                    break;
                }
            }
        }
        if (priestCopy.qualifications) {
            for (const qual of priestCopy.qualifications) {
                if (!checkDate(qual.genesisDate)) {
                    badDates.push("qualifications");
                    break;
                }
            }
        }
        if (priestCopy.mainPriestPlaces) {
            for (const mpp of priestCopy.mainPriestPlaces) {
                if (!checkDate(mpp.startDate) || !checkDate(mpp.endDate)) {
                    badDates.push("mainPriestPlaces");
                    break;
                }
            }
        }
        if (priestCopy.assistantPriestPlaces) {
            for (const app of priestCopy.assistantPriestPlaces) {
                if (!checkDate(app.startDate) || !checkDate(app.endDate)) {
                    badDates.push("assistantPriestPlaces");
                    break;
                }
            }
        }
        if (priestCopy.churchOffices) {
            for (const co of priestCopy.churchOffices) {
                if (!checkDate(co.startDate) || !checkDate(co.endDate)) {
                    badDates.push("churchOffices");
                    break;
                }
            }
        }
        if (priestCopy.otherOffices) {
            for (const oo of priestCopy.otherOffices) {
                if (!checkDate(oo.startDate) || !checkDate(oo.endDate)) {
                    badDates.push("otherOffices");
                    break;
                }
            }
        }
        if (priestCopy.suspensions) {
            for (const sps of priestCopy.suspensions) {
                if (!checkDate(sps.startDate) || !checkDate(sps.endDate)) {
                    badDates.push("suspensions");
                    break;
                }
            }
        }
        if (priestCopy.literaryWorks) {
            for (const lw of priestCopy.literaryWorks) {
                if (!checkDate(lw.published)) {
                    badDates.push("literaryWorks");
                    break;
                }
            }
        }
        if (priestCopy.priestReferences) {
            for (const pr of priestCopy.priestReferences) {
                if (!checkDate(pr.date)) {
                    badDates.push("priestReferences");
                    break;
                }
            }
        }
        if (priestCopy.father) {
            if (!checkDate(priestCopy.father.birthDate) || !checkDate(priestCopy.father.deathDate)) {
                badDates.push("father");
            }
        }
        if (priestCopy.mother) {
            if (!checkDate(priestCopy.mother.birthDate) || !checkDate(priestCopy.mother.deathDate)) {
                badDates.push("mother");
            }
        }
        if (priestCopy.consecration) {
            if (!checkDate(priestCopy.consecration.date)) {
                badDates.push("consecrationDate");
            }
        }
        if (priestCopy.changedCareer) {
            if (!checkDate(priestCopy.changedCareer.date)) {
                badDates.push("changedCareerDate");
            }
        }
        return badDates;
    };

    const handleRevertChanges = () => {
        setDateErrors([] as string[]);
        setPriestNameError(false);
        setEditMode(false);
    };

    if (showError || showDeleteError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <CardPlaceholder />;
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
                {(priestNameError || dateErrors.length !== 0) && (
                    <Message negative>
                        <div style={{ marginBottom: "1em" }}>
                            <BoldFM id={"formError.profileError"} />
                        </div>
                        {priestNameError && (
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
                <PriestProfileHeader
                    priest={priestCopy}
                    setPriest={setPriestCopy}
                    editMode={editMode}
                    isAdmin={isAdmin(userRole)}
                    asyncDelete={asyncDelete}
                    handleEditModeChange={handleEditModeChange}
                />
                <Divider />
                {(() => {
                    const priestProfileProps = { priest: priestCopy, loading, showError, editMode, setPriest: setPriestCopy };

                    switch (currentTab) {
                        case PriestProfileTab.family: {
                            return <PriestFamilyContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.qualification: {
                            return <PriestQualificationContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.placements: {
                            return <PriestPlacementContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.occupations: {
                            return <PriestOccupationContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.disciplinaryMatters: {
                            return <PriestDisciplinaryMattersContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.pathOfLife: {
                            return <PriestLifepathContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.references: {
                            return <PriestReferencesContainer {...priestProfileProps} />;
                        }
                        case PriestProfileTab.pictures && false: {
                            return (
                                <PriestProfileFileContainer
                                    {...priestProfileProps}
                                    fileType={PriestProfileFileType.Picture}
                                    errorStatusPostFile={errorStatusPostFile}
                                    errorStatusDeleteFile={errorStatusDeleteFile}
                                    setFiles={setFiles}
                                    setFileType={setFileType}
                                    asyncPostFile={asyncPostFile}
                                    asyncDeleteFile={asyncDeleteFile}
                                />
                            );
                        }
                        case PriestProfileTab.files && false: {
                            return (
                                <PriestProfileFileContainer
                                    {...priestProfileProps}
                                    fileType={PriestProfileFileType.File}
                                    errorStatusPostFile={errorStatusPostFile}
                                    errorStatusDeleteFile={errorStatusDeleteFile}
                                    setFiles={setFiles}
                                    setFileType={setFileType}
                                    asyncPostFile={asyncPostFile}
                                    asyncDeleteFile={asyncDeleteFile}
                                />
                            );
                        }
                        case PriestProfileTab.notes: {
                            return <PriestNotesContainer {...priestProfileProps} />;
                        }
                        default: {
                            return <PriestGeneralDataContainer {...priestProfileProps} />;
                        }
                    }
                })()}
            </>
        );
    }
};

export default PriestProfileContainer;
