import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

import "../../../static/priestProfile.css";

interface IPictureCardProps {
    index: number;
    picture: string;
    editMode: boolean;
    handleDeletePicture(index: number, picture: string): void;
}

const PictureCard: React.FC<IPictureCardProps> = (props: IPictureCardProps) => {
    const { index, picture, editMode, handleDeletePicture } = props;

    const handleDeleteFilePressed = () => {
        handleDeletePicture(index, picture);
    };

    return (
        <Card>
            <Image src={picture} href={picture} target="_blank" />
            {editMode && <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleDeleteFilePressed} />}
        </Card>
    );
};

export default PictureCard;
