import React from "react";
import { Button, Card } from "semantic-ui-react";

import { NavLink } from "react-router-dom";
import "../../../static/priestProfile.css";

interface IFileCardProps {
    editMode: boolean;
    index: number;
    file: string;
    fileName: string;
    handleDeleteFile(index: number, file: string): void;
}

const FileCard: React.FC<IFileCardProps> = (props: IFileCardProps) => {
    const { editMode, index, file, fileName, handleDeleteFile } = props;

    const handleDeleteFilePressed = () => {
        handleDeleteFile(index, file);
    };

    return (
        <Card>
            <Card.Content icon="file">
                <NavLink to={`${file}`} className="hoverLink">{`${fileName}`}</NavLink>
                {editMode && <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleDeleteFilePressed} />}
            </Card.Content>
        </Card>
    );
};

export default FileCard;
