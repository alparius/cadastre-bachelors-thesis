import React from "react";
import { Button, Card, Header, List } from "semantic-ui-react";

import IOffice from "../../../data/priest/Office";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface IOfficeCardProps {
    office: IOffice;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnOffice: (labelName: string, value: any, index: number) => void;
}

const OfficeCard: React.FC<IOfficeCardProps> = (props: IOfficeCardProps) => {
    const { office, index, editMode, handleDelete, handleChangeOnOffice } = props;

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
                            <Header as="h2">{office.name}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRow
                                    labelName="officeName"
                                    dataName="name"
                                    index={index}
                                    data={office.name}
                                    editMode={editMode}
                                    setValue={handleChangeOnOffice}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate
                                labelName="startDate"
                                index={index}
                                data={office.startDate}
                                editMode={editMode}
                                setValue={handleChangeOnOffice}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate
                                labelName="endDate"
                                index={index}
                                data={office.endDate}
                                editMode={editMode}
                                setValue={handleChangeOnOffice}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRow labelName="comment" index={index} data={office.comment} editMode={editMode} setValue={handleChangeOnOffice} />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default OfficeCard;
