import React from "react";
import { Card } from "semantic-ui-react";

import IParishMin from "../../../data/parish/ParishMin";
import IPlacement from "../../../data/priest/Placement";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import PlacementCard from "./PlacementCard";

interface IPriestAssistantPriestPlaceListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    parishResponse: IParishMin[] | undefined;
    parishLoading: boolean;
    parishShowError: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestAssistantPriestPlaceList: React.FC<IPriestAssistantPriestPlaceListProps> = (props: IPriestAssistantPriestPlaceListProps) => {
    const { priest, editMode, setPriest, parishResponse, parishLoading, parishShowError } = props;

    const handleDeletePlacement = (index: number) => {
        priest.assistantPriestPlaces.splice(index, 1);
        setPriest({
            ...priest,
            assistantPriestPlaces: priest.assistantPriestPlaces
        });
    };

    const handleChangeOnPlacementField = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            assistantPriestPlaces: priest.assistantPriestPlaces.map((app, i) => (i === index ? { ...app, [labelName]: value } : { ...app }))
        });
    };

    const handlePlacementChange = (placeID: number, place: string, index: number) => {
        setPriest({
            ...priest,
            assistantPriestPlaces: priest.assistantPriestPlaces.map((app, i) => (i === index ? { ...app, placeID, place } : { ...app }))
        });
    };

    if (!priest.assistantPriestPlaces || priest.assistantPriestPlaces.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.assistantPriestPlaces.map((assistantPriestPlace: IPlacement, index: number) => (
                    <PlacementCard
                        key={index}
                        index={index}
                        editMode={editMode}
                        placement={assistantPriestPlace}
                        handleDeletePlacement={handleDeletePlacement}
                        handleChangeOnPlacementField={handleChangeOnPlacementField}
                        handlePlacementChange={handlePlacementChange}
                        parishResponse={parishResponse}
                        parishLoading={parishLoading}
                        parishShowError={parishShowError}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestAssistantPriestPlaceList;
