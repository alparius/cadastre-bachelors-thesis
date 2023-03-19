import React from "react";
import { Button, Card, List } from "semantic-ui-react";

import IDisciplinaryMatter from "../../../data/priest/DisciplinaryMatter";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";

interface IDisciplinaryMatterCardProps {
    disciplinaryMatter: IDisciplinaryMatter;
    index: number;
    editMode: boolean;
    handleDelete: (index: number) => void;
    handleChangeOnDisciplinaryMatter: (labelName: string, value: any, index: number) => void;
}

const DisciplinaryMatterCard: React.FC<IDisciplinaryMatterCardProps> = (props: IDisciplinaryMatterCardProps) => {
    const { disciplinaryMatter, index, editMode, handleDelete, handleChangeOnDisciplinaryMatter } = props;

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
                                labelName="disciplinaryMatterName"
                                dataName="name"
                                index={index}
                                data={disciplinaryMatter.name}
                                editMode={editMode}
                                setValue={handleChangeOnDisciplinaryMatter}
                            />
                        </List.Item>
                        <List.Item>
                            <CardRow
                                labelName="issuingAuthority"
                                index={index}
                                data={disciplinaryMatter.issuingAuthority}
                                editMode={editMode}
                                setValue={handleChangeOnDisciplinaryMatter}
                            />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default DisciplinaryMatterCard;
