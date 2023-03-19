import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import DisciplinaryMatterCard from "./DisciplinaryMatterCard";

interface IPriestDisciplinaryMatterListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestDisciplinaryMatterList: React.FC<IPriestDisciplinaryMatterListProps> = (props: IPriestDisciplinaryMatterListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.disciplinaryMatters.splice(index, 1);
        setPriest({
            ...priest,
            spouses: priest.spouses
        });
    };

    const handleChangeOnDisciplinaryMatter = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            disciplinaryMatters: priest.disciplinaryMatters.map((disciplinaryMatter, i) =>
                i === index ? { ...disciplinaryMatter, [labelName]: value } : { ...disciplinaryMatter }
            )
        });
    };

    if (!priest.disciplinaryMatters || priest.disciplinaryMatters.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.disciplinaryMatters.map((_, index: number) => (
                    <DisciplinaryMatterCard
                        key={index}
                        disciplinaryMatter={priest.disciplinaryMatters[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnDisciplinaryMatter={handleChangeOnDisciplinaryMatter}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestDisciplinaryMatterList;
