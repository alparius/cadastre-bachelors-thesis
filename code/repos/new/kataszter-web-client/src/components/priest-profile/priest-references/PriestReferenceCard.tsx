import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import IPriestReference from "../../../data/priest/PriestReference";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface IPriestReferenceCardProps {
    priestReference: IPriestReference;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnPriestReference: (labelName: string, value: any, index: number) => void;
}

const PriestReferenceCard: React.FC<IPriestReferenceCardProps> = (props: IPriestReferenceCardProps) => {
    const { priestReference, index, editMode, handleDelete, handleChangeOnPriestReference } = props;

    const handleOnClick = () => {
        handleDelete(index);
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Content>
                    {editMode ? (
                        <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleOnClick} />
                    ) : (
                        <Card.Header id="header">
                            <Header as="h2">{priestReference.place}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow
                                    labelName="reference"
                                    dataName="place"
                                    index={index}
                                    data={priestReference.place}
                                    editMode={editMode}
                                    setValue={handleChangeOnPriestReference}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate
                                labelName="date"
                                index={index}
                                data={priestReference.date}
                                editMode={editMode}
                                setValue={handleChangeOnPriestReference}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default PriestReferenceCard;
