import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import OfficeCard from "./OfficeCard";

interface IPriestOtherOfficeListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestOtherOfficeList: React.FC<IPriestOtherOfficeListProps> = (props: IPriestOtherOfficeListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.otherOffices.splice(index, 1);
        setPriest({
            ...priest,
            otherOffices: priest.otherOffices
        });
    };

    const handleChangeOnOffice = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            otherOffices: priest.otherOffices.map((otherOffice, i) => (i === index ? { ...otherOffice, [labelName]: value } : { ...otherOffice }))
        });
    };

    if (!priest.otherOffices || priest.otherOffices.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.otherOffices.map((_, index: number) => (
                    <OfficeCard
                        key={index}
                        office={priest.otherOffices[index]}
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

export default PriestOtherOfficeList;
