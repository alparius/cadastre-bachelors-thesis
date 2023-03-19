import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import IChild from "../../../data/priest/Child";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface IChildCardProps {
    child: IChild;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnChild: (labelName: string, value: any, index: number) => void;
}

const ChildCard: React.FC<IChildCardProps> = (props: IChildCardProps) => {
    const { child, index, editMode, handleDelete, handleChangeOnChild } = props;

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
                            <Header as="h2">{child.name}</Header>
                        </Card.Header>
                    )}
                </Card.Content>
                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow labelName="name" index={index} data={child.name} editMode={editMode} setValue={handleChangeOnChild} />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRow
                                labelName="birthPlace"
                                index={index}
                                data={child.birthPlace}
                                editMode={editMode}
                                setValue={handleChangeOnChild}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate
                                labelName="birthDate"
                                index={index}
                                data={child.birthDate}
                                editMode={editMode}
                                setValue={handleChangeOnChild}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default ChildCard;
