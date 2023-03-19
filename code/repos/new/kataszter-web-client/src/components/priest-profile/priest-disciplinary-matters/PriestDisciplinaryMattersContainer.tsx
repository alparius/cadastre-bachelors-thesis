import React from "react";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";

import { NewDisciplinaryMatter } from "../../../data/priest/DisciplinaryMatter";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewSuspension } from "../../../data/priest/Suspension";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestGeneralDataRowContainerForDate from "../priest-general-data/PriestGeneralDataRowContainerForDate";
import PriestDisciplinaryMatterList from "./PriestDisciplinaryMatterList";
import PriestSuspensionList from "./PriestSuspensionList";

interface IPriestPlacementContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestDisciplinaryMattersContainer: React.FC<IPriestPlacementContainerProps> = (props: IPriestPlacementContainerProps) => {
    const { priest, loading, showError, editMode, setPriest } = props;

    const handleChangesOnPriest = (labelName: string, value: any) => {
        setPriest({ ...priest, [labelName]: value });
    };

    const handleNewDisciplinaryMatter = () => {
        if (priest) {
            if (priest.disciplinaryMatters) {
                priest.disciplinaryMatters.splice(0, 0, { ...NewDisciplinaryMatter });
                setPriest({
                    ...priest,
                    disciplinaryMatters: priest.disciplinaryMatters
                });
            } else {
                setPriest({
                    ...priest,
                    disciplinaryMatters: [{ ...NewDisciplinaryMatter }]
                });
            }
        }
    };

    const handleNewSuspension = () => {
        if (priest) {
            if (priest.suspensions) {
                priest.suspensions.splice(0, 0, { ...NewSuspension });
                setPriest({
                    ...priest,
                    suspensions: priest.suspensions
                });
            } else {
                setPriest({
                    ...priest,
                    suspensions: [{ ...NewSuspension }]
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
                    {priest.disciplinaryMatters && priest.disciplinaryMatters.length > 1 ? (
                        <ItalicFM id="profile.disciplinaryMatters" />
                    ) : (
                        <ItalicFM id="profile.disciplinaryMatter" />
                    )}
                </Header>
                {editMode && (
                    <Button
                        id="addNewDisciplinaryMatter"
                        style={{ marginBottom: "2em" }}
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewDisciplinaryMatter}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewDisciplinaryMatter" />
                    </Button>
                )}
                <PriestDisciplinaryMatterList priest={priest} editMode={editMode} setPriest={setPriest} />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    {priest.suspensions && priest.suspensions.length > 1 ? (
                        <ItalicFM id="profile.suspensions" />
                    ) : (
                        <ItalicFM id="profile.suspension" />
                    )}
                </Header>
                {editMode && (
                    <Button id="addNewSuspension" icon basic color="violet" circular labelPosition="left" onClick={handleNewSuspension}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewSuspension" />
                    </Button>
                )}
                <PriestSuspensionList priest={priest} editMode={editMode} setPriest={setPriest} />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    <ItalicFM id="profile.additionalData" />
                </Header>
                <Grid columns={2}>
                    <PriestGeneralDataRowContainerForDate
                        labelName="fired"
                        data={priest.fired}
                        editMode={editMode}
                        setPriest={handleChangesOnPriest}
                    />
                </Grid>
            </>
        );
    }
};

export default PriestDisciplinaryMattersContainer;
