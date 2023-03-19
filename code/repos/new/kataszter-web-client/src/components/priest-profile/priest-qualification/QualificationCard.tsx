import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import IQualification from "../../../data/priest/Qualification";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface IQualificationCardProps {
    qualification: IQualification;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnQualification: (labelName: string, value: any, index: number) => void;
}

const QualificationCard: React.FC<IQualificationCardProps> = (props: IQualificationCardProps) => {
    const { qualification, index, editMode, handleDelete, handleChangeOnQualification } = props;

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
                            <Header as="h2">{qualification.diplomaName}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow
                                    labelName="diplomaName"
                                    index={index}
                                    data={qualification.diplomaName}
                                    editMode={editMode}
                                    setValue={handleChangeOnQualification}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate
                                labelName="genesisDate"
                                index={index}
                                data={qualification.genesisDate}
                                editMode={editMode}
                                setValue={handleChangeOnQualification}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRow
                                labelName="issuingAuthority"
                                index={index}
                                data={qualification.issuingAuthority}
                                editMode={editMode}
                                setValue={handleChangeOnQualification}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default QualificationCard;
