import React from "react";
import { Button, Card, Divider, Header, Icon } from "semantic-ui-react";

import { NewChild } from "../../../data/priest/Child";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import { NewSpouse } from "../../../data/priest/Spouse";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import ParentCard from "./ParentCard";
import PriestFamilyChildList from "./PriestFamilyChildList";
import PriestFamilySpouseList from "./PriestFamilySpouseList";

interface IPriestFamilyContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
    editMode: boolean;
    setPriest(newPriest: IPriestProfileData): void;
}

const PriestFamilyContainer: React.FC<IPriestFamilyContainerProps> = (props: IPriestFamilyContainerProps) => {
    const { priest, setPriest, loading, showError, editMode } = props;

    const handleNewChild = () => {
        if (priest) {
            if (priest.children) {
                priest.children.splice(0, 0, { ...NewChild });
                setPriest({
                    ...priest,
                    children: priest.children
                });
            } else {
                setPriest({
                    ...priest,
                    children: [{ ...NewChild }]
                });
            }
        }
    };

    const handleNewSpouse = () => {
        if (priest) {
            if (priest.spouses) {
                priest.spouses.splice(0, 0, { ...NewSpouse });
                setPriest({
                    ...priest,
                    spouses: priest.spouses
                });
            } else {
                setPriest({
                    ...priest,
                    spouses: [{ ...NewSpouse }]
                });
            }
        }
    };

    const handleChangeOnParent = (labelName: string, value: any) => {
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
                    <ItalicFM id="profile.parents" />
                </Header>
                {priest.father.name || priest.mother.name || editMode ? (
                    <Card.Group stackable doubling itemsPerRow={2}>
                        <ParentCard label="father" parentData={priest.father} editMode={editMode} handleChangeOnParent={handleChangeOnParent} />
                        <ParentCard label="mother" parentData={priest.mother} editMode={editMode} handleChangeOnParent={handleChangeOnParent} />
                    </Card.Group>
                ) : (
                    <ItalicFM id="general.noData" />
                )}

                <Divider />

                <Header as="h2">
                    {priest.spouses && priest.spouses.length > 1 ? <ItalicFM id="profile.spouses" /> : <ItalicFM id="profile.spouse" />}
                </Header>
                {editMode && (
                    <Button id="addNewSpouse" icon basic color="violet" circular labelPosition="left" onClick={handleNewSpouse}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewSpouse" />
                    </Button>
                )}

                <PriestFamilySpouseList priest={priest} editMode={editMode} setPriest={setPriest} />
                <Divider style={{ marginTop: "2em" }} />

                <Header as="h2">
                    {priest.children && priest.children.length > 1 ? <ItalicFM id="profile.children" /> : <ItalicFM id="profile.child" />}
                </Header>
                {editMode && (
                    <Button id="addNewChild" icon basic color="violet" circular labelPosition="left" onClick={handleNewChild}>
                        <Icon name="add" color="violet" size="large" />
                        <BoldFM id="profile.addNewChild" />
                    </Button>
                )}
                <PriestFamilyChildList priest={priest} editMode={editMode} setPriest={setPriest} />
            </>
        );
    }
};

export default PriestFamilyContainer;
