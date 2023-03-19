import React from "react";
import { Button, Divider, Header, Icon } from "semantic-ui-react";

import IParishGeneralData from "../../../data/parish/ParishGeneralData";
import { NewParishPastName } from "../../../data/parish/ParishPastName";
import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import NotesTextAreaContainer from "../../NotesTextAreaContainer";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import ParishPastNameList from "../ParishPastNameList";
import ParishCoordinateContainer from "./ParishCoordinateContainer";
import ParishGeneralDataRowContainer from "./ParishGeneralDataRowContainer";
import ParishGeneralPlacementList from "./ParishGeneralPlacementList";

interface IParishGeneralDataContainerProps {
    parish: IParishGeneralData | undefined;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setParish(newParish: IParishGeneralData): void;
}

const ParishGeneralDataContainer: React.FC<IParishGeneralDataContainerProps> = (props: IParishGeneralDataContainerProps) => {
    const { parish, setParish, loading, showError, editMode } = props;

    const handleNewPastName = () => {
        if (parish) {
            if (parish.pastNames) {
                parish.pastNames.splice(0, 0, { ...NewParishPastName });
                setParish({
                    ...parish,
                    pastNames: parish.pastNames
                });
            } else {
                setParish({
                    ...parish,
                    pastNames: [{ ...NewParishPastName }]
                });
            }
        }
    };

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !parish) {
        return <ProfilePlaceholder />;
    } else {
        const handleChangesOnParish = (labelName: string, value: any) => {
            setParish({ ...parish, [labelName]: value });
        };

        const handleCoordinateChangesOnParish = (labelName: string, value: any) => {
            const newCoords = { ...parish.coordinates, [labelName]: value };
            setParish({ ...parish, coordinates: newCoords });
        };

        return (
            <>
                <Header as="h2">
                    <ItalicFM id="profile.generalData" />
                </Header>
                <ParishGeneralDataRowContainer labelName="name" data={parish.name} editMode={editMode} setParish={handleChangesOnParish} />
                <ParishGeneralDataRowContainer labelName="cityName" data={parish.cityName} editMode={editMode} setParish={handleChangesOnParish} />
                <ParishCoordinateContainer
                    labelName="lat"
                    data={parish.coordinates.lat}
                    editMode={editMode}
                    setParish={handleCoordinateChangesOnParish}
                />
                <ParishCoordinateContainer
                    labelName="lng"
                    data={parish.coordinates.lng}
                    editMode={editMode}
                    setParish={handleCoordinateChangesOnParish}
                />
                <Divider />
                <ParishGeneralPlacementList placements={parish.mainPriests} headerKey="label.priest.mainPlacements" />
                <Divider />
                <ParishGeneralPlacementList placements={parish.assistantPriests} headerKey="label.priest.assistantPlacements" />

                <Divider />

                <Header as="h2">
                    <ItalicFM id="label.parish.history" />
                </Header>
                <NotesTextAreaContainer
                    labelName="history"
                    textAreaSize={200}
                    data={parish.history}
                    editMode={editMode}
                    setData={handleChangesOnParish}
                />

                <Divider />

                <Header as="h2">
                    <ItalicFM id="label.parish.names" />
                </Header>
                {editMode && (
                    <Button
                        id="addNew"
                        style={{ marginBottom: "2em" }}
                        icon
                        basic
                        color="violet"
                        circular
                        labelPosition="left"
                        onClick={handleNewPastName}
                    >
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewPastName" />
                    </Button>
                )}
                <ParishPastNameList parish={parish} editMode={editMode} setParish={setParish} />
            </>
        );
    }
};

export default ParishGeneralDataContainer;
