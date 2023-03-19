import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Header, List } from "semantic-ui-react";

import IParishMin from "../../../data/parish/ParishMin";
import IMainPlacement from "../../../data/priest/MainPlacement";
import "../../../static/priestProfile.css";
import CardRow from "../CardRow";
import CardRowForDate from "../CardRowForDate";
import CardRowPlacementDropDown from "./CardRowPlacementDropDown";

interface IMainPlacementCardProps {
    placement: IMainPlacement;
    index: number;
    editMode: boolean;
    handleDeletePlacement: (index: number) => void;
    handleChangeOnPlacementField: (labelName: string, value: any, index: number) => void;
    handlePlacementChange: (placeID: number, place: string, index: number) => void;
    parishResponse: IParishMin[] | undefined;
    parishLoading: boolean;
    parishShowError: boolean;
}

const MainPlacementCard: React.FC<IMainPlacementCardProps> = (props: IMainPlacementCardProps) => {
    const {
        placement,
        index,
        editMode,
        handleDeletePlacement,
        handleChangeOnPlacementField,
        handlePlacementChange,
        parishResponse,
        parishLoading,
        parishShowError
    } = props;

    const editHandlers = {
        index,
        editMode,
        setValue: handleChangeOnPlacementField
    };

    const handleDeletePressed = () => {
        handleDeletePlacement(index);
    };

    const getCardContent = () => {
        return (
            <Card.Content>
                <Card.Content>
                    {editMode ? (
                        <Button id="deleteButton" floated="right" icon="trash" color="red" inverted onClick={handleDeletePressed} />
                    ) : (
                        <Card.Header id="header">
                            <Header as="h2">{placement.place}</Header>
                        </Card.Header>
                    )}
                </Card.Content>

                <Card.Description>
                    <List>
                        {editMode && (
                            <List.Item>
                                <CardRowPlacementDropDown
                                    placeID={placement.placeID}
                                    placeName={placement.place}
                                    index={index}
                                    editMode={editMode}
                                    handlePlacementChange={handlePlacementChange}
                                    parishResponse={parishResponse}
                                    parishLoading={parishLoading}
                                    parishShowError={parishShowError}
                                />
                            </List.Item>
                        )}
                        <List.Item>
                            <CardRowForDate labelName="startDate" data={placement.startDate} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate labelName="endDate" data={placement.endDate} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRow labelName="numberOfPeople" data={placement.numberOfPeople} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRow labelName="munimentIssuingAuthority" data={placement.munimentIssuingAuthority} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRowForDate labelName="munimentGenesisDate" data={placement.munimentGenesisDate} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRow labelName="munimentNumber" data={placement.munimentNumber} {...editHandlers} />
                        </List.Item>
                        <List.Item>
                            <CardRow labelName="income" data={placement.income} {...editHandlers} />
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        );
    };

    if (editMode) {
        return <Card fluid>{getCardContent()}</Card>;
    } else {
        return (
            <Card fluid as={NavLink} to={`/parishes/profile/${placement.placeID}`}>
                {getCardContent()}
            </Card>
        );
    }
};

export default MainPlacementCard;
