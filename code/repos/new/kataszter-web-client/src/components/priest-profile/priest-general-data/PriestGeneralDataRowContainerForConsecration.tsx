import React from "react";

import IConsecration from "../../../data/priest/Consecration";
import "../../../static/priestProfile.css";
import PriestGeneralDataRowContainer from "./PriestGeneralDataRowContainer";
import PriestGeneralDataRowContainerForDate from "./PriestGeneralDataRowContainerForDate";

interface IConsecrationProps {
    consecrationData: IConsecration;
    editMode: boolean;
    handleChangeOnConsecration: (labelName: string, value: any) => void;
}

const ConsecrationRow: React.FC<IConsecrationProps> = (props: IConsecrationProps) => {
    const { consecrationData, editMode, handleChangeOnConsecration } = props;

    const handleChange = (labelName: string, value: any) => {
        handleChangeOnConsecration("consecration", { ...consecrationData, [labelName]: value });
    };

    return (
        <>
            <PriestGeneralDataRowContainerForDate
                labelName="consecrationDate"
                dataName="date"
                data={consecrationData.date}
                editMode={editMode}
                setPriest={handleChange}
                isGrey
            />
            <PriestGeneralDataRowContainer
                labelName="consecrationPlace"
                dataName="place"
                data={consecrationData.place}
                editMode={editMode}
                setPriest={handleChange}
            />
        </>
    );
};

export default ConsecrationRow;
