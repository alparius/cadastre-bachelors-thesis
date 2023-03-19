import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, Form, Header, Menu, Responsive } from "semantic-ui-react";

import PriestProfileTab from "../../data/enums/PriestProfileTab";

interface IPriestProfileControllerProps {
    currentTab: string;
    editMode: boolean;
    setCurrentTab(newCurrentTab: string): void;
}

const PriestProfileController: React.FC<IPriestProfileControllerProps> = (props: IPriestProfileControllerProps) => {
    const { currentTab, setCurrentTab, editMode } = props;

    const handleCurrentTabChange = (e: any, { value }: any) => setCurrentTab(value);

    return (
        <>
            {editMode && <Responsive as={Divider} maxWidth={768} style={{ marginTop: "6em" }} />}
            <Form>
                <Header as="h1" className="controllerHeader">
                    <FM id="profile.profilePriest" />
                </Header>

                <Menu fluid vertical secondary color="violet" size="huge">
                    <Menu.Item
                        id="general"
                        value={PriestProfileTab.general}
                        active={currentTab === PriestProfileTab.general}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="profile.generalData" />
                    </Menu.Item>
                    <Menu.Item
                        id="family"
                        value={PriestProfileTab.family}
                        active={currentTab === PriestProfileTab.family}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.family" />
                    </Menu.Item>
                    <Menu.Item
                        id="qualification"
                        value={PriestProfileTab.qualification}
                        active={currentTab === PriestProfileTab.qualification}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.qualification" />
                    </Menu.Item>
                    <Menu.Item
                        id="placements"
                        value={PriestProfileTab.placements}
                        active={currentTab === PriestProfileTab.placements}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.placements" />
                    </Menu.Item>
                    <Menu.Item
                        id="occupations"
                        value={PriestProfileTab.occupations}
                        active={currentTab === PriestProfileTab.occupations}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.occupations" />
                    </Menu.Item>
                    <Menu.Item
                        id="disciplinaryMatters"
                        value={PriestProfileTab.disciplinaryMatters}
                        active={currentTab === PriestProfileTab.disciplinaryMatters}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.disciplinaryMatters" />
                    </Menu.Item>
                    <Menu.Item
                        id="pathOfLife"
                        value={PriestProfileTab.pathOfLife}
                        active={currentTab === PriestProfileTab.pathOfLife}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.pathOfLife" />
                    </Menu.Item>
                    <Menu.Item
                        id="references"
                        value={PriestProfileTab.references}
                        active={currentTab === PriestProfileTab.references}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.references" />
                    </Menu.Item>
                    <Menu.Item
                        id="pictures"
                        value={PriestProfileTab.pictures}
                        active={currentTab === PriestProfileTab.pictures}
                        disabled
                        // onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.pictures" />
                    </Menu.Item>
                    <Menu.Item
                        id="files"
                        value={PriestProfileTab.files}
                        active={currentTab === PriestProfileTab.files}
                        disabled
                        // onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.files" />
                    </Menu.Item>
                    <Menu.Item
                        id="notes"
                        value={PriestProfileTab.notes}
                        active={currentTab === PriestProfileTab.notes}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.notes" />
                    </Menu.Item>
                </Menu>
            </Form>
        </>
    );
};

export default PriestProfileController;
