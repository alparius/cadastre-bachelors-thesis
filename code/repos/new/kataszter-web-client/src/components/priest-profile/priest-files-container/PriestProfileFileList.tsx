import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import API_URL from "../../../requests/apiConfig";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import FileCard from "../../common/file-upload/FileCard";
import PictureCard from "../../common/picture-upload/PictureCard";
import { PriestProfileFileType } from "./PriestProfileFileContainer";

interface IPriestProfileFileListProps {
    fileType: PriestProfileFileType;
    editMode: boolean;
    priest: IPriestProfileData;
    priestFiles: string[];
    asyncDeleteFile(url: string): void;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestProfileFileList: React.FC<IPriestProfileFileListProps> = (props: IPriestProfileFileListProps) => {
    const { fileType, editMode, priest, priestFiles, asyncDeleteFile, setPriest } = props;

    const handleDeleteFile = (index: number, file: string) => {
        asyncDeleteFile(file);
        priest.files.splice(index, 1);
        setPriest({
            ...priest,
            files: priest.files
        });
    };

    const handleDeletePicture = (index: number, picture: string) => {
        asyncDeleteFile(picture);
        priest.pictures.splice(index, 1);
        setPriest({
            ...priest,
            pictures: priest.pictures
        });
    };

    if (!priestFiles || priestFiles.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <>
                {fileType === PriestProfileFileType.File ? (
                    <Card.Group stackable itemsPerRow={1}>
                        {priestFiles.map((file: string, index: number) => (
                            <FileCard
                                key={index}
                                index={index}
                                editMode={editMode}
                                file={API_URL + `/priests/${priest.ID}/files/${file}`}
                                fileName={file}
                                handleDeleteFile={handleDeleteFile}
                            />
                        ))}
                    </Card.Group>
                ) : (
                    <Card.Group stackable doubling itemsPerRow={2}>
                        {priestFiles.map((picture: string, index: number) => (
                            <PictureCard
                                key={index}
                                index={index}
                                editMode={editMode}
                                picture={API_URL + `/priests/${priest.ID}/pictures/${picture}`}
                                handleDeletePicture={handleDeletePicture}
                            />
                        ))}
                        ​
                    </Card.Group>
                )}
            </>
        );
    }
};

export default PriestProfileFileList;
