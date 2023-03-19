import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import LiteraryWorkCard from "./LiteraryWorkCard";

interface ILiteraryWorkListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestLiteraryWorkList: React.FC<ILiteraryWorkListProps> = (props: ILiteraryWorkListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.literaryWorks.splice(index, 1);
        setPriest({
            ...priest,
            literaryWorks: priest.literaryWorks
        });
    };

    const handleChangeOnLiteraryWork = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            literaryWorks: priest.literaryWorks.map((literaryWork, i) =>
                i === index ? { ...literaryWork, [labelName]: value } : { ...literaryWork }
            )
        });
    };

    if (!priest.literaryWorks || priest.literaryWorks.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.literaryWorks.map((_, index: number) => (
                    <LiteraryWorkCard
                        key={index}
                        literaryWork={priest.literaryWorks[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnLiteraryWork={handleChangeOnLiteraryWork}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestLiteraryWorkList;
