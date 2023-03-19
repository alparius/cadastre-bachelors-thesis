import React from "react";
import { Card } from "semantic-ui-react";

import IParishGeneralData from "../../../data/parish/ParishGeneralData";
import API_URL from "../../../requests/apiConfig";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import FileCard from "../../common/file-upload/FileCard";
import PictureCard from "../../common/picture-upload/PictureCard";
import { ParishProfileFileType } from "./ParishProfileFileContainer";

interface IParishProfileFileListProps {
    fileType: ParishProfileFileType;
    editMode: boolean;
    parish: IParishGeneralData;
    parishFiles: string[];
    asyncDeleteFile(url: string): void;
    setParish(newParish: IParishGeneralData): void;
}

const ParishProfileFileList: React.FC<IParishProfileFileListProps> = (props: IParishProfileFileListProps) => {
    const { fileType, editMode, parish, parishFiles, asyncDeleteFile, setParish } = props;

    const handleDeleteFile = (index: number, file: string) => {
        asyncDeleteFile(file);
        parish.files.splice(index, 1);
        setParish({
            ...parish,
            files: parish.files
        });
    };

    const handleDeletePicture = (index: number, picture: string) => {
        asyncDeleteFile(picture);
        parish.pictures.splice(index, 1);
        setParish({
            ...parish,
            pictures: parish.pictures
        });
    };

    if (!parishFiles || parishFiles.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <>
                {fileType === ParishProfileFileType.File ? (
                    <Card.Group stackable itemsPerRow={1}>
                        {parishFiles.map((file: string, index: number) => (
                            <FileCard
                                key={index}
                                index={index}
                                editMode={editMode}
                                file={API_URL + `/parishes/${parish.ID}/files/${file}`}
                                fileName={file}
                                handleDeleteFile={handleDeleteFile}
                            />
                        ))}
                    </Card.Group>
                ) : (
                    <Card.Group stackable doubling itemsPerRow={2}>
                        {parishFiles.map((picture: string, index: number) => (
                            <PictureCard
                                key={index}
                                index={index}
                                editMode={editMode}
                                picture={API_URL + `/parishes/${parish.ID}/pictures/${picture}`}
                                handleDeletePicture={handleDeletePicture}
                            />
                        ))}
                    </Card.Group>
                )}
            </>
        );
    }
};

export default ParishProfileFileList;
