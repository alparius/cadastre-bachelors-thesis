import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, Label } from "semantic-ui-react";

import ParishGeneralData from "../../../data/parish/ParishGeneralData";
import IParishGeneralData from "../../../data/parish/ParishGeneralData";
import FileUpload from "../../common/uploader/FileUpload";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import ParishProfileFileList from "./ParishProfileFileList";

export enum ParishProfileFileType {
    File,
    Picture
}

interface IParishProfileFileContainerProps {
    parish: ParishGeneralData;
    loading: boolean;
    fileType: ParishProfileFileType;
    editMode: boolean;
    showError: boolean;
    errorStatusPostFile: number;
    errorStatusDeleteFile: number;
    setFiles(newFiles: FileList): void;
    setFileType(newFileType: string): void;
    setParish(newParish: IParishGeneralData): void;
    asyncPostFile(): void;
    asyncDeleteFile(url: string): void;
}

const ParishProfileFileContainer: React.FC<IParishProfileFileContainerProps> = (props: IParishProfileFileContainerProps) => {
    const {
        parish,
        loading,
        editMode,
        fileType,
        showError,
        errorStatusPostFile,
        errorStatusDeleteFile,
        setFiles,
        setFileType,
        setParish,
        asyncPostFile,
        asyncDeleteFile
    } = props;

    if (showError || errorStatusPostFile === 404) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (errorStatusPostFile === 500 || errorStatusDeleteFile === 500) {
        return <ErrorMsg errorMessage={"error.server"} />;
    } else if (loading || !parish) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                {editMode && (
                    <>
                        <FileUpload
                            fileType={fileType === ParishProfileFileType.File ? "files" : "pictures"}
                            acceptType={fileType === ParishProfileFileType.File ? ".pdf, .docx" : "image/png, image/jpeg"}
                            setFiles={setFiles}
                            setFileType={setFileType}
                            asyncPostFile={asyncPostFile}
                        />
                        {errorStatusPostFile === 400 && (
                            <Label>
                                <FM id={"error.invalidFile"} />
                            </Label>
                        )}
                    </>
                )}
                <Divider />
                <ParishProfileFileList
                    fileType={fileType}
                    editMode={editMode}
                    parishFiles={fileType === ParishProfileFileType.File ? parish.files : parish.pictures}
                    parish={parish}
                    asyncDeleteFile={asyncDeleteFile}
                    setParish={setParish}
                />
            </>
        );
    }
};

export default ParishProfileFileContainer;
