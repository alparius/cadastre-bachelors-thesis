import React from "react";
import { Button, Divider, Header, Icon } from "semantic-ui-react";

import IParishMin from "../../../data/parish/ParishMin";
import { NewMainPlacement } from "../../../data/priest/MainPlacement";
import { NewPlacement } from "../../../data/priest/Placement";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import useFetchData from "../../../requests/useFetchData";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import PriestAssistantPriestPlaceList from "./PriestAssistantPriestPlaceList";
import PriestMainPriestPlaceList from "./PriestMainPriestPlaceList";

interface IPriestPlacementContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestPlacementContainer: React.FC<IPriestPlacementContainerProps> = (props: IPriestPlacementContainerProps) => {
    const { priest, loading, showError, editMode, setPriest } = props;

    const { response: parishResponse, loading: parishLoading, showError: parishShowError } = useFetchData<IParishMin[]>(`/parishes`);

    const handleNewMainPlacement = () => {
        if (priest) {
            if (priest.mainPriestPlaces) {
                priest.mainPriestPlaces.splice(0, 0, { ...NewMainPlacement });
                setPriest({
                    ...priest,
                    mainPriestPlaces: priest.mainPriestPlaces
                });
            } else {
                setPriest({
                    ...priest,
                    mainPriestPlaces: [{ ...NewMainPlacement }]
                });
            }
        }
    };

    const handleNewAssistantPlacement = () => {
        if (priest) {
            if (priest.assistantPriestPlaces) {
                priest.assistantPriestPlaces.splice(0, 0, { ...NewPlacement });
                setPriest({
                    ...priest,
                    assistantPriestPlaces: priest.assistantPriestPlaces
                });
            } else {
                setPriest({
                    ...priest,
                    assistantPriestPlaces: [{ ...NewPlacement }]
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
                    {priest.mainPriestPlaces && priest.mainPriestPlaces.length > 1 ? (
                        <ItalicFM id="profile.mainPriestPlaces" />
                    ) : (
                        <ItalicFM id="profile.mainPriestPlace" />
                    )}
                </Header>
                {editMode && (
                    <Button
                        id="addNewMainPlacement"
                        style={{ marginBottom: "2em" }}
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewMainPlacement}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewMainPlacement" />
                    </Button>
                )}
                <PriestMainPriestPlaceList
                    priest={priest}
                    editMode={editMode}
                    setPriest={setPriest}
                    parishResponse={parishResponse}
                    parishLoading={parishLoading}
                    parishShowError={parishShowError}
                />

                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    {priest.assistantPriestPlaces && priest.assistantPriestPlaces.length > 1 ? (
                        <ItalicFM id="profile.assistantPriestPlaces" />
                    ) : (
                        <ItalicFM id="profile.assistantPriestPlace" />
                    )}
                </Header>
                {editMode && (
                    <Button
                        id="addNewAssistantPlacement"
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewAssistantPlacement}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewAssistantPlacement" />
                    </Button>
                )}
                <PriestAssistantPriestPlaceList
                    priest={priest}
                    editMode={editMode}
                    setPriest={setPriest}
                    parishResponse={parishResponse}
                    parishLoading={parishLoading}
                    parishShowError={parishShowError}
                />
            </>
        );
    }
};

export default PriestPlacementContainer;
