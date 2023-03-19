import React from "react";
import { Card, Header, List } from "semantic-ui-react";

import IParent from "../../../data/priest/Parent";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";

interface IParentCardProps {
    parentData: IParent;
    editMode: boolean;
    label: string;
    handleChangeOnParent: (labelName: string, value: any) => void;
}

const ParentCard: React.FC<IParentCardProps> = (props: IParentCardProps) => {
    const { parentData, editMode, handleChangeOnParent, label } = props;

    const handleChange = (labelName: string, value: any) => {
        handleChangeOnParent(label, { ...parentData, [labelName]: value });
    };

    if (parentData.name || editMode) {
        return (
            <Card fluid>
                <Card.Content>
                    {!editMode && (
                        <Card.Header id="header">
                            <Header as="h2">{parentData.name}</Header>
                        </Card.Header>
                    )}
                    <Card.Description>
                        <List>
                            {editMode && (
                                <List.Item>
                                    <CardRow labelName="name" data={parentData.name} editMode={editMode} setValue={handleChange} />
                                </List.Item>
                            )}
                            <List.Item>
                                <CardRow labelName="job" data={parentData.job} editMode={editMode} setValue={handleChange} />
                            </List.Item>
                            <List.Item>
                                <CardRowForDate labelName="birthDate" data={parentData.birthDate} editMode={editMode} setValue={handleChange} />
                            </List.Item>
                            <List.Item>
                                <CardRowForDate labelName="deathDate" data={parentData.deathDate} editMode={editMode} setValue={handleChange} />
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    } else {
        return <React.Fragment />;
    }
};

export default ParentCard;
