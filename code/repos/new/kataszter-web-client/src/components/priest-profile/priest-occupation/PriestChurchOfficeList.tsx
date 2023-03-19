import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import OfficeCard from "./OfficeCard";

interface IPriestChurchOfficeListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestChurchOfficeList: React.FC<IPriestChurchOfficeListProps> = (props: IPriestChurchOfficeListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.churchOffices.splice(index, 1);
        setPriest({
            ...priest,
            churchOffices: priest.churchOffices
        });
    };

    const handleChangeOnOffice = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            churchOffices: priest.churchOffices.map((churchOffice, i) =>
                i === index ? { ...churchOffice, [labelName]: value } : { ...churchOffice }
            )
        });
    };

    if (!priest.churchOffices || priest.churchOffices.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.churchOffices.map((_, index: number) => (
                    <OfficeCard
                        key={index}
                        office={priest.churchOffices[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnOffice={handleChangeOnOffice}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestChurchOfficeList;
