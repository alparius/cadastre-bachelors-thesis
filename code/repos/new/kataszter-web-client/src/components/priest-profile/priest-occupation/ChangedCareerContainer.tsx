import React from "react";

import IChangedCareer from "../../../data/priest/ChangedCareer";
import "../../../static/priestProfile.css";
import PriestGeneralDataRowContainer from "../priest-general-data/PriestGeneralDataRowContainer";
import PriestGeneralDataRowContainerForDate from "../priest-general-data/PriestGeneralDataRowContainerForDate";

interface ILanguageCardProps {
    changedCareerData: IChangedCareer;
    editMode: boolean;
    label: string;
    handleChangeOnChangedCareer: (labelName: string, value: any) => void;
}

const ChangedCareerContainer: React.FC<ILanguageCardProps> = (props: ILanguageCardProps) => {
    const { changedCareerData, editMode, handleChangeOnChangedCareer, label } = props;

    const handleChange = (labelName: string, value: any) => {
        handleChangeOnChangedCareer(label, { ...changedCareerData, [labelName]: value });
    };

    return (
        <>
            <PriestGeneralDataRowContainerForDate
                labelName="changedCareerDate"
                dataName="date"
                data={changedCareerData.date}
                editMode={editMode}
                setPriest={handleChange}
                isGrey
            />
            <PriestGeneralDataRowContainer
                labelName="changedCareerName"
                dataName="name"
                data={changedCareerData.name}
                editMode={editMode}
                setPriest={handleChange}
            />
        </>
    );
};

export default ChangedCareerContainer;
