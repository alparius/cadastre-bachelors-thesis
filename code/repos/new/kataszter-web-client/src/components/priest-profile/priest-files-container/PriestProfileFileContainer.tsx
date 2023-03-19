import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, Label } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import FileUpload from "../../common/uploader/FileUpload";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestProfileFileList from "./PriestProfileFileList";

export enum PriestProfileFileType {
    File,
    Picture
}

interface IPriestProfileFileContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    fileType: PriestProfileFileType;
    showError: boolean;
    errorStatusPostFile: number;
    errorStatusDeleteFile: number;
    editMode: boolean;
    setFiles(newFiles: FileList): void;
    setFileType(newFileType: string): void;
    setPriest(newPriest: IPriestProfileData): void;
    asyncPostFile(): void;
    asyncDeleteFile(url: string): void;
}

const PriestProfileFileContainer: React.FC<IPriestProfileFileContainerProps> = (props: IPriestProfileFileContainerProps) => {
    const {
        priest,
        loading,
        fileType,
        showError,
        errorStatusPostFile,
        errorStatusDeleteFile,
        editMode,
        setFiles,
        setFileType,
        setPriest,
        asyncPostFile,
        asyncDeleteFile
    } = props;

    if (showError || errorStatusPostFile === 404) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (errorStatusPostFile === 500 || errorStatusDeleteFile === 500) {
        return <ErrorMsg errorMessage={"error.server"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                {editMode ? (
                    <>
                        <FileUpload
                            fileType={fileType === PriestProfileFileType.File ? "files" : "pictures"}
                            acceptType={fileType === PriestProfileFileType.File ? ".pdf, .docx" : "image/png, image/jpeg"}
                            setFiles={setFiles}
                            setFileType={setFileType}
                            asyncPostFile={asyncPostFile}
                        />
                        {errorStatusPostFile === 400 ? (
                            <Label>
                                <FM id={"error.invalidFile"} />
                            </Label>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <></>
                )}
                <Divider />
                <PriestProfileFileList
                    fileType={fileType}
                    editMode={editMode}
                    priestFiles={fileType === PriestProfileFileType.File ? priest.files : priest.pictures}
                    priest={priest}
                    asyncDeleteFile={asyncDeleteFile}
                    setPriest={setPriest}
                />
            </>
        );
    }
};

export default PriestProfileFileContainer;
