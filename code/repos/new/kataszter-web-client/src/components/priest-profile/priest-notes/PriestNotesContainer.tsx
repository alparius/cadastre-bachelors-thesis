import React from "react";
import { Header } from "semantic-ui-react";

import IPriestProfileData from "../../../data/priest/PriestProfileData";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import NotesTextAreaContainer from "../../NotesTextAreaContainer";
import ProfilePlaceholder from "../../ProfilePlaceholder";

interface IPriestPlacementContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestNotesContainer: React.FC<IPriestPlacementContainerProps> = (props: IPriestPlacementContainerProps) => {
    const { priest, loading, showError, editMode, setPriest } = props;

    const handleChangesOnPriest = (labelName: string, value: any) => {
        setPriest({ ...priest, [labelName]: value });
    };

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                <Header as="h1">
                    <ItalicFM id="profile.officialNotes" />
                </Header>
                <NotesTextAreaContainer labelName="note" textAreaSize={500} data={priest.note} editMode={editMode} setData={handleChangesOnPriest} />
            </>
        );
    }
};

export default PriestNotesContainer;
