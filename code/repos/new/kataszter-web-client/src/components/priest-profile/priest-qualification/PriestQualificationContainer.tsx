import React from "react";
import { Button, Card, Divider, Header, Icon } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewQualification } from "../../../data/priest/Qualification";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import LanguageCard from "./LanguageCard";
import PriestProfileQualificationList from "./PriestQualificationList";

interface IPriestQualificationContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestQualificationContainer: React.FC<IPriestQualificationContainerProps> = (props: IPriestQualificationContainerProps) => {
    const { priest, setPriest, loading, showError, editMode } = props;

    const handleNewQualification = () => {
        if (priest) {
            if (priest.qualifications) {
                priest.qualifications.splice(0, 0, { ...NewQualification });
                setPriest({
                    ...priest,
                    qualifications: priest.qualifications
                });
            } else {
                setPriest({
                    ...priest,
                    qualifications: [{ ...NewQualification }]
                });
            }
        }
    };

    const handleChangeOnLanguageSkills = (labelName: string, value: any) => {
        setPriest({ ...priest, [labelName]: value });
    };

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                <Header as="h2">
                    <ItalicFM id="profile.languageSkills" />
                </Header>
                <Card.Group stackable doubling itemsPerRow={2}>
                    <LanguageCard
                        label="speakingSkills"
                        languageSkills={priest.speakingSkills}
                        editMode={editMode}
                        handleChangeOnLanguageSkills={handleChangeOnLanguageSkills}
                    />
                    <LanguageCard
                        label="writingSkills"
                        languageSkills={priest.writingSkills}
                        editMode={editMode}
                        handleChangeOnLanguageSkills={handleChangeOnLanguageSkills}
                    />
                </Card.Group>

                <Divider />

                <Header as="h2">
                    {priest.qualifications && priest.qualifications.length > 1 ? (
                        <ItalicFM id="profile.qualifications" />
                    ) : (
                        <ItalicFM id="profile.qualification" />
                    )}
                </Header>
                {editMode && (
                    <Button id="addNew" icon basic color="violet" circular labelPosition="left" onClick={handleNewQualification}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewQualification" />
                    </Button>
                )}
                <PriestProfileQualificationList priest={priest} editMode={editMode} setPriest={setPriest} />
            </>
        );
    }
};

export default PriestQualificationContainer;
