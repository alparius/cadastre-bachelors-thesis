import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import ILiteraryWork from "../../../data/priest/LiteraryWork";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface ILiteraryWorkCardProps {
    literaryWork: ILiteraryWork;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnLiteraryWork: (labelName: string, value: any, index: number) => void;
}

const LiteraryWorkCard: React.FC<ILiteraryWorkCardProps> = (props: ILiteraryWorkCardProps) => {
    const { literaryWork, index, editMode, handleDelete, handleChangeOnLiteraryWork } = props;

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
                            <Header as="h2">{literaryWork.title}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow
                                    labelName="title"
                                    index={index}
                                    data={literaryWork.title}
                                    editMode={editMode}
                                    setValue={handleChangeOnLiteraryWork}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate
                                labelName="published"
                                index={index}
                                data={literaryWork.published}
                                editMode={editMode}
                                setValue={handleChangeOnLiteraryWork}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRow
                                labelName="publisher"
                                index={index}
                                data={literaryWork.publisher}
                                editMode={editMode}
                                setValue={handleChangeOnLiteraryWork}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default LiteraryWorkCard;
