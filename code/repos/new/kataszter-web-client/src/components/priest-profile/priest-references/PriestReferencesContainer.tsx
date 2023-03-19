import React from "react";
import { Button, Divider, Header, Icon } from "semantic-ui-react";

import { NewLiteraryWork } from "../../../data/priest/LiteraryWork";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewPriestReference } from "../../../data/priest/PriestReference";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestLiteraryWorkList from "./PriestLiteraryWorkList";
import PriestPriestReferenceList from "./PriestPriestReferenceList";

interface IPriestPlacementContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestReferencesContainer: React.FC<IPriestPlacementContainerProps> = (props: IPriestPlacementContainerProps) => {
    const { priest, loading, showError, editMode, setPriest } = props;

    const handleNewLiteraryWork = () => {
        if (priest) {
            if (priest.literaryWorks) {
                priest.literaryWorks.splice(0, 0, { ...NewLiteraryWork });
                setPriest({
                    ...priest,
                    literaryWorks: priest.literaryWorks
                });
            } else {
                setPriest({
                    ...priest,
                    literaryWorks: [{ ...NewLiteraryWork }]
                });
            }
        }
    };

    const handleNewPriestReferences = () => {
        if (priest) {
            if (priest.priestReferences) {
                priest.priestReferences.splice(0, 0, { ...NewPriestReference });
                setPriest({
                    ...priest,
                    priestReferences: priest.priestReferences
                });
            } else {
                setPriest({
                    ...priest,
                    priestReferences: [{ ...NewPriestReference }]
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
                    {priest.literaryWorks && priest.literaryWorks.length > 1 ? (
                        <ItalicFM id="profile.literaryWorks" />
                    ) : (
                        <ItalicFM id="profile.literaryWork" />
                    )}
                </Header>
                {editMode && (
                    <Button
                        id="addNewLiteraryWork"
                        style={{ marginBottom: "2em" }}
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewLiteraryWork}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewLiteraryWork" />
                    </Button>
                )}
                <PriestLiteraryWorkList priest={priest} editMode={editMode} setPriest={setPriest} />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    {priest.priestReferences && priest.priestReferences.length > 1 ? (
                        <ItalicFM id="profile.priestReferences" />
                    ) : (
                        <ItalicFM id="profile.priestReference" />
                    )}
                </Header>
                {editMode && (
                    <Button id="addNewPriestReference" icon basic color="violet" circular labelPosition="left" onClick={handleNewPriestReferences}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewPriestReference" />
                    </Button>
                )}
                <PriestPriestReferenceList priest={priest} editMode={editMode} setPriest={setPriest} />
            </>
        );
    }
};
export default PriestReferencesContainer;
