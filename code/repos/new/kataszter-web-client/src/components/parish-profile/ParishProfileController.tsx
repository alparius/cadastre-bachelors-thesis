import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Divider, Form, Menu, Responsive } from "semantic-ui-react";

import ParishProfileTab from "../../data/enums/ParishProfileTab";

interface IParishProfileControllerProps {
    currentTab: string;
    editMode: boolean;
    setCurrentTab(newCurrentTab: string): void;
}

const ParishProfileController: React.FC<IParishProfileControllerProps> = (props: IParishProfileControllerProps) => {
    const { currentTab, setCurrentTab, editMode } = props;

    const handleCurrentTabChange = (e: any, { value }: any) => setCurrentTab(value);

    return (
        <>
            {editMode && <Responsive as={Divider} maxWidth={768} style={{ marginTop: "6em" }} />}
            <Form>
                <Menu fluid vertical secondary color="violet" size="huge">
                    <Menu.Item
                        id="general"
                        value={ParishProfileTab.general}
                        active={currentTab === ParishProfileTab.general}
                        onClick={handleCurrentTabChange}
                    >
                        <FM id="profile.generalData" />
                    </Menu.Item>
                    <Menu.Item
                        id="pictures"
                        value={ParishProfileTab.pictures}
                        active={currentTab === ParishProfileTab.pictures}
                        disabled
                        // onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.pictures" />
                    </Menu.Item>
                    <Menu.Item
                        id="files"
                        value={ParishProfileTab.files}
                        active={currentTab === ParishProfileTab.files}
                        disabled
                        // onClick={handleCurrentTabChange}
                    >
                        <FM id="menu.files" />
                    </Menu.Item>
                </Menu>
            </Form>
        </>
    );
};

export default ParishProfileController;
