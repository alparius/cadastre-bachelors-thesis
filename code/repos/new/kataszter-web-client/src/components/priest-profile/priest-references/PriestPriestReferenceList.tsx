import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import PriestReferenceCard from "./PriestReferenceCard";

interface IPriestReferenceListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestPriestReferenceList: React.FC<IPriestReferenceListProps> = (props: IPriestReferenceListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.priestReferences.splice(index, 1);
        setPriest({
            ...priest,
            priestReferences: priest.priestReferences
        });
    };

    const handleChangeOnPriestReference = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            priestReferences: priest.priestReferences.map((priestReference, i) =>
                i === index ? { ...priestReference, [labelName]: value } : { ...priestReference }
            )
        });
    };

    if (!priest.priestReferences || priest.priestReferences.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.priestReferences.map((_, index: number) => (
                    <PriestReferenceCard
                        key={index}
                        priestReference={priest.priestReferences[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnPriestReference={handleChangeOnPriestReference}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestPriestReferenceList;
