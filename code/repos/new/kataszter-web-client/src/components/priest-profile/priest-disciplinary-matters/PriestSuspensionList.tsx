import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import SuspensionCard from "./SuspensionCard";

interface IPriestSuspensionListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestSuspensionList: React.FC<IPriestSuspensionListProps> = (props: IPriestSuspensionListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.suspensions.splice(index, 1);
        setPriest({
            ...priest,
            spouses: priest.spouses
        });
    };

    const handleChangeOnSuspension = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            suspensions: priest.suspensions.map((suspension, i) => (i === index ? { ...suspension, [labelName]: value } : { ...suspension }))
        });
    };

    if (!priest.suspensions || priest.suspensions.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.suspensions.map((_, index: number) => (
                    <SuspensionCard
                        key={index}
                        suspension={priest.suspensions[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnSuspension={handleChangeOnSuspension}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestSuspensionList;
