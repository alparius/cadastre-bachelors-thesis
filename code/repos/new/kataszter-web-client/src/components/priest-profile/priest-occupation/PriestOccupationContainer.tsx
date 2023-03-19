import React from "react";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";

import { NewOffice } from "../../../data/priest/Office";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestGeneralDataRowContainer from "../priest-general-data/PriestGeneralDataRowContainer";
import ChangedCareerContainer from "./ChangedCareerContainer";
import PriestChurchOfficeList from "./PriestChurchOfficeList";
import PriestOtherOfficeList from "./PriestOtherOfficeList";

interface IPriestPlacementContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestOccupationContainer: React.FC<IPriestPlacementContainerProps> = (props: IPriestPlacementContainerProps) => {
    const { priest, loading, showError, editMode, setPriest } = props;

    const handleChangesOnPriest = (labelName: string, value: any) => {
        setPriest({ ...priest, [labelName]: value });
    };

    const handleChangeOnChangedCareer = (labelName: string, value: any) => {
        setPriest({ ...priest, [labelName]: value });
    };

    const handleNewChurchOffice = () => {
        if (priest) {
            if (priest.churchOffices) {
                priest.churchOffices.splice(0, 0, { ...NewOffice });
                setPriest({
                    ...priest,
                    churchOffices: priest.churchOffices
                });
            } else {
                setPriest({
                    ...priest,
                    churchOffices: [{ ...NewOffice }]
                });
            }
        }
    };

    const handleNewOtherOffice = () => {
        if (priest) {
            if (priest.otherOffices) {
                priest.otherOffices.splice(0, 0, { ...NewOffice });
                setPriest({
                    ...priest,
                    otherOffices: priest.otherOffices
                });
            } else {
                setPriest({
                    ...priest,
                    otherOffices: [{ ...NewOffice }]
                });
            }
        }
    };

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                <Header as="h2">
                    {priest.churchOffices && priest.churchOffices.length > 1 ? (
                        <ItalicFM id="profile.churchOffices" />
                    ) : (
                        <ItalicFM id="profile.churchOffice" />
                    )}
                </Header>
                {editMode && (
                    <Button
                        id="addNewChurchOffice"
                        style={{ marginBottom: "2em" }}
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewChurchOffice}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewChurchOffice" />
                    </Button>
                )}
                <PriestChurchOfficeList priest={priest} editMode={editMode} setPriest={setPriest} />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    {priest.otherOffices && priest.otherOffices.length > 1 ? (
                        <ItalicFM id="profile.otherOffices" />
                    ) : (
                        <ItalicFM id="profile.otherOffice" />
                    )}
                </Header>
                {editMode && (
                    <Button id="addNewOtherOffice" icon basic color="violet" circular labelPosition="left" onClick={handleNewOtherOffice}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewOtherOffice" />
                    </Button>
                )}
                <PriestOtherOfficeList priest={priest} editMode={editMode} setPriest={setPriest} />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    <ItalicFM id="profile.additionalData" />
                </Header>
                <Grid columns={2}>
                    <PriestGeneralDataRowContainer labelName="army" data={priest.army} editMode={editMode} setPriest={handleChangesOnPriest} />
                    <ChangedCareerContainer
                        label="changedCareer"
                        changedCareerData={priest.changedCareer}
                        editMode={editMode}
                        handleChangeOnChangedCareer={handleChangeOnChangedCareer}
                    />
                </Grid>
            </>
        );
    }
};

export default PriestOccupationContainer;
