import React from "react";
import { Card } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import QualificationCard from "./QualificationCard";

interface IPriestProfileQualificationListProps {
    priest: IPriestProfileData;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestQualificationList: React.FC<IPriestProfileQualificationListProps> = (props: IPriestProfileQualificationListProps) => {
    const { priest, editMode, setPriest } = props;

    const handleDelete = (index: number) => {
        priest.qualifications.splice(index, 1);
        setPriest({
            ...priest,
            qualifications: priest.qualifications
        });
    };

    const handleChangeOnQualification = (labelName: string, value: any, index: number) => {
        setPriest({
            ...priest,
            qualifications: priest.qualifications.map((qualification, i) =>
                i === index ? { ...qualification, [labelName]: value } : { ...qualification }
            )
        });
    };

    if (!priest.qualifications || priest.qualifications.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable doubling itemsPerRow={2}>
                {priest.qualifications.map((_, index: number) => (
                    <QualificationCard
                        key={index}
                        qualification={priest.qualifications[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnQualification={handleChangeOnQualification}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default PriestQualificationList;
