import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import ISpouse from "../../../data/priest/Spouse";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface ISpouseCardProps {
    spouse: ISpouse;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnSpouse: (labelName: string, value: any, index: number) => void;
}

const SpouseCard: React.FC<ISpouseCardProps> = (props: ISpouseCardProps) => {
    const { spouse, index, editMode, handleDelete, handleChangeOnSpouse } = props;

    const handleOnClick = () => {
        handleDelete(index);
    };

    return (
        <>
            <Card fluid>
                <Card.Content>
                    <Card.Content>
                        {editMode ? (
                            <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleOnClick} />
                        ) : (
                            <Card.Header id="header">
                                <Header as="h2">{spouse.name}</Header>
                            </Card.Header>
                        )}
                    </Card.Content>

                    <Card.Description>
                        <List>
                            {editMode && (
                                <List.Item>
                                    <CardRow labelName="name" index={index} data={spouse.name} editMode={editMode} setValue={handleChangeOnSpouse} />
                                </List.Item>
                            )}
                            <List.Item>
                                <CardRowForDate
                                    labelName="birthDate"
                                    index={index}
                                    data={spouse.birthDate}
                                    editMode={editMode}
                                    setValue={handleChangeOnSpouse}
                                />
                            </List.Item>
                            <List.Item>
                                <CardRowForDate
                                    labelName="marriageDate"
                                    index={index}
                                    data={spouse.marriageDate}
                                    editMode={editMode}
                                    setValue={handleChangeOnSpouse}
                                />
                            </List.Item>
                            <List.Item>
                                <CardRow labelName="job" index={index} data={spouse.job} editMode={editMode} setValue={handleChangeOnSpouse} />
                            </List.Item>
                            <List.Item>
                                <CardRow
                                    labelName="fatherName"
                                    index={index}
                                    data={spouse.fatherName}
                                    editMode={editMode}
                                    setValue={handleChangeOnSpouse}
                                />
                            </List.Item>
                            <List.Item>
                                <CardRow
                                    labelName="motherName"
                                    index={index}
                                    data={spouse.motherName}
                                    editMode={editMode}
                                    setValue={handleChangeOnSpouse}
                                />
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    );
};

export default SpouseCard;
