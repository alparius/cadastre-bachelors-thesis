import React from "react";
import { Grid } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import "../../../static/priestProfile.css";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestGeneralDataRowContainer from "./PriestGeneralDataRowContainer";
import PriestGeneralDataRowContainerForConsecration from "./PriestGeneralDataRowContainerForConsecration";
import PriestGeneralDataRowContainerForDate from "./PriestGeneralDataRowContainerForDate";

interface IPriestGeneralDataContainerProps {
    priest: IPriestProfileData | undefined;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestGeneralDataContainer: React.FC<IPriestGeneralDataContainerProps> = (props: IPriestGeneralDataContainerProps) => {
    const { priest, setPriest, loading, showError, editMode } = props;

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        const handleChangesOnPriest = (labelName: string, value: any) => {
            setPriest({ ...priest, [labelName]: value });
        };

        const handleChangeOnConsecration = (labelName: string, value: any) => {
            setPriest({ ...priest, [labelName]: value });
        };

        return (
            <>
                <Grid columns={2}>
                    <PriestGeneralDataRowContainer labelName="name" data={priest.name} editMode={editMode} setPriest={handleChangesOnPriest} />
                    <PriestGeneralDataRowContainerForDate
                        labelName="birthDate"
                        data={priest.birthDate}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                        isGrey
                    />
                    <PriestGeneralDataRowContainer
                        labelName="birthCountry"
                        data={priest.birthCountry}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                    <PriestGeneralDataRowContainer
                        labelName="birthCounty"
                        data={priest.birthCounty}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                        isGrey
                    />
                    <PriestGeneralDataRowContainer
                        labelName="birthTown"
                        data={priest.birthTown}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                    <PriestGeneralDataRowContainerForDate
                        labelName="subscriptionDate"
                        data={priest.subscriptionDate}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                        isGrey
                    />
                    <PriestGeneralDataRowContainerForDate
                        labelName="graduationDate"
                        data={priest.graduationDate}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                    <PriestGeneralDataRowContainerForConsecration
                        consecrationData={priest.consecration}
                        editMode={editMode}
                        handleChangeOnConsecration={handleChangeOnConsecration}
                    />
                    <PriestGeneralDataRowContainer
                        labelName="diocese"
                        data={priest.diocese}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                        isGrey
                    />
                    <PriestGeneralDataRowContainerForDate
                        labelName="resigned"
                        data={priest.resigned}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                    <PriestGeneralDataRowContainerForDate
                        labelName="retirementDate"
                        data={priest.retirementDate}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                        isGrey
                    />
                    <PriestGeneralDataRowContainerForDate
                        labelName="deathDate"
                        data={priest.deathDate}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                </Grid>
            </>
        );
    }
};

export default PriestGeneralDataContainer;
