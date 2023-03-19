import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ChildCard from "./ChildCard";

interface IPriestChildListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestFamilyChildList: React.FC<IPriestChildListProps> = (props: IPriestChildListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.children.splice(index, 1);
        setPriest({
            ...priest,
            children: priest.children
        });
    };

    const handleChangeOnChild = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            children: priest.children.map((child, i) => (i === index ? { ...child, [labelName]: value } : { ...child }))
        });
    };

    if (!priest.children || priest.children.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.children.map((_, index: number) => (
                    <ChildCard
                        key={index}
                        child={priest.children[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnChild={handleChangeOnChild}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestFamilyChildList;
