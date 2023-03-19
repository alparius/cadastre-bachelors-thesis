import React from "react";
import { Card } from "semantic-ui-react";

import IParishMin from "../../../data/parish/ParishMin";
import IMainPlacement from "../../../data/priest/MainPlacement";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import MainPlacementCard from "./MainPlacementCard";

interface IPriestMainPriestPlaceListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    parishResponse: IParishMin[] | undefined;
    parishLoading: boolean;
    parishShowError: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestMainPriestPlaceList: React.FC<IPriestMainPriestPlaceListProps> = (props: IPriestMainPriestPlaceListProps) => {
    const { priest, editMode, setPriest, parishResponse, parishLoading, parishShowError } = props;

    const handleDeletePlacement = (index: number) => {
        priest.mainPriestPlaces.splice(index, 1);
        setPriest({
            ...priest,
            mainPriestPlaces: priest.mainPriestPlaces
        });
    };

    const handleChangeOnPlacementField = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            mainPriestPlaces: priest.mainPriestPlaces.map((mpp, i) => (i === index ? { ...mpp, [labelName]: value } : { ...mpp }))
        });
    };

    const handlePlacementChange = (placeID: number, place: string, index: number) => {
        setPriest({
            ...priest,
            mainPriestPlaces: priest.mainPriestPlaces.map((mpp, i) => (i === index ? { ...mpp, placeID, place } : { ...mpp }))
        });
    };

    if (!priest.mainPriestPlaces || priest.mainPriestPlaces.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.mainPriestPlaces.map((mainPriestPlace: IMainPlacement, index: number) => (
                    <MainPlacementCard
                        key={index}
                        index={index}
                        editMode={editMode}
                        placement={mainPriestPlace}
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

export default PriestMainPriestPlaceList;
