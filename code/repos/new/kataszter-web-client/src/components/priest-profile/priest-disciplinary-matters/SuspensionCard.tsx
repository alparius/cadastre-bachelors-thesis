import React from "react";
import { Button, Card, List } from "semantic-ui-react";

import ISuspension from "../../../data/priest/Suspension";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface ISuspensionCardProps {
    suspension: ISuspension;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnSuspension: (labelName: string, value: any, index: number) => void;
}

const SuspensionCard: React.FC<ISuspensionCardProps> = (props: ISuspensionCardProps) => {
    const { suspension, index, editMode, handleDelete, handleChangeOnSuspension } = props;

    const handleOnClick = () => {
        handleDelete(index);
    };

    return (
        <Card fluid>
            <Card.Content>
                <Card.Content>
                    {editMode && <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleOnClick} />}
                </Card.Content>

                <Card.Description>
                    <List>
                        <List.Item>
                            <CardRow
                                labelName="punishment"
                                index={index}
                                data={suspension.punishment}
                                editMode={editMode}
                                setValue={handleChangeOnSuspension}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate
                                labelName="startDate"
                                index={index}
                                data={suspension.startDate}
                                editMode={editMode}
                                setValue={handleChangeOnSuspension}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate
                                labelName="endDate"
                                index={index}
                                data={suspension.endDate}
                                editMode={editMode}
                                setValue={handleChangeOnSuspension}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default SuspensionCard;
