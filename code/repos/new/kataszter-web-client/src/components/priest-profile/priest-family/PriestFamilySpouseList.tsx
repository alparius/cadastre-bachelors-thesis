import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import SpouseCard from "./SpouseCard";

interface IPriestSpouseListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestFamilySpouseList: React.FC<IPriestSpouseListProps> = (props: IPriestSpouseListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.spouses.splice(index, 1);
        setPriest({
            ...priest,
            spouses: priest.spouses
        });
    };

    const handleChangeOnSpouse = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            spouses: priest.spouses.map((spouse, i) => (i === index ? { ...spouse, [labelName]: value } : { ...spouse }))
        });
    };

    if (!priest.spouses || priest.spouses.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.spouses.map((_, index: number) => (
                    <SpouseCard
                        key={index}
                        spouse={priest.spouses[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnSpouse={handleChangeOnSpouse}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestFamilySpouseList;
