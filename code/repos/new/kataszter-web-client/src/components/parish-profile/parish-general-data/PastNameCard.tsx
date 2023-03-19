import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import IParishPastName from "../../../data/parish/ParishPastName";
import "../../../static/priestProfile.css";
import CardRow from "../../priest-profile/CardRow";
import CardRowForDate from "../../priest-profile/CardRowForDate";

interface IPastNameCardProps {
    pastName: IParishPastName;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnPastName: (labelName: string, value: any, index: number) => void;
}

const PastNameCard: React.FC<IPastNameCardProps> = (props: IPastNameCardProps) => {
    const { pastName, index, editMode, handleDelete, handleChangeOnPastName } = props;

    const handleDeletePressed = () => {
        handleDelete(index);
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Content>
                    {editMode ? (
                        <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleDeletePressed} />
                    ) : (
                        <Card.Header id="header">
                            <Header as="h2">{pastName.name}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow
                                    labelName="parishName"
                                    dataName="name"
                                    index={index}
                                    data={pastName.name}
                                    editMode={editMode}
                                    setValue={handleChangeOnPastName}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate
                                labelName="intervallStart"
                                dataName="startDate"
                                index={index}
                                data={pastName.startDate}
                                editMode={editMode}
                                setValue={handleChangeOnPastName}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate
                                labelName="intervallEnd"
                                dataName="endDate"
                                index={index}
                                data={pastName.endDate}
                                editMode={editMode}
                                setValue={handleChangeOnPastName}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default PastNameCard;
