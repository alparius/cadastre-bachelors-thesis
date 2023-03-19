import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Confirm, Form, Grid, Header, Icon, Popup } from "semantic-ui-react";

import IParishGeneralData from "../../data/parish/ParishGeneralData";
import ProfilePlaceholder from "../ProfilePlaceholder";

interface IParishProfileHeaderProps {
    parish: IParishGeneralData;
    editMode: boolean;
    isAdmin: boolean;
    handleEditModeChange: (e: any, { value }: any) => void;
    setParish(newParish: IParishGeneralData): void;
    asyncDelete(url: string): void;
}

const ParishProfileHeader: React.FC<IParishProfileHeaderProps> = (props: IParishProfileHeaderProps) => {
    const { parish, editMode, isAdmin, handleEditModeChange, setParish, asyncDelete } = props;
    const { formatMessage: fm } = useIntl();

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleDeleteSubmit = () => {
        setDeleteConfirmOpen(false);
        asyncDelete("/parish/" + parish.ID);
    };

    const handleDeleteConfirmOpen = (_: any) => {
        setDeleteConfirmOpen(true);
    };

    const hasAllocations = (): boolean => {
        const nrMainAllocs = parish.mainPriests && parish.mainPriests.length ? parish.mainPriests.length : 0;
        const nrAssistAllocs = parish.assistantPriests && parish.assistantPriests.length ? parish.assistantPriests.length : 0;
        return nrMainAllocs + nrAssistAllocs > 0;
    };

    const toggleVerified = () => setParish({ ...parish, verified: !parish.verified });

    if (!parish) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                <Confirm
                    content={fm({ id: "confirm.delete.message.parish" })}
                    open={deleteConfirmOpen}
                    confirmButton={fm({ id: "confirm.delete.confirm" })}
                    onConfirm={handleDeleteSubmit}
                    cancelButton={fm({ id: "confirm.delete.cancel" })}
                    onCancel={() => setDeleteConfirmOpen(false)}
                />

                <Grid columns={12} stackable>
                    <Grid.Row verticalAlign="middle" textAlign="center">
                        <Grid.Column />
                        <Grid.Column width={editMode ? 10 : 7}>
                            <Grid.Row>
                                <Header as="h1">
                                    {parish.name}
                                    <span style={{ float: "right" }}>
                                        {editMode && (
                                            <Form.Checkbox
                                                label={fm({ id: "profile.verified.label" })}
                                                name="verified"
                                                toggle
                                                checked={parish.verified}
                                                onChange={toggleVerified}
                                            />
                                        )}
                                        {parish.verified ? (
                                            <Popup
                                                content={fm({ id: "profile.verified.isVerifiedPopup" })}
                                                trigger={<Icon name="check circle outline" fitted color="green" />}
                                            />
                                        ) : (
                                            <Popup
                                                content={fm({ id: "profile.verified.notVerifiedPopup" })}
                                                trigger={<Icon name="question circle outline" fitted color="grey" />}
                                            />
                                        )}
                                    </span>
                                </Header>
                            </Grid.Row>
                            {parish.cityName && (
                                <Grid.Row>
                                    <Header as="h3" textAlign="center">
                                        {parish.cityName}
                                    </Header>
                                </Grid.Row>
                            )}
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column width={3}>
                            {!editMode && isAdmin && (
                                <>
                                    <Button
                                        id="editModeButton"
                                        value
                                        onClick={handleEditModeChange}
                                        size="large"
                                        color="violet"
                                        inverted
                                        icon
                                        labelPosition="left"
                                        style={{ marginBottom: "1em", fontFamily: "monospace" }}
                                    >
                                        <Icon name="edit" />
                                        <FM id="profile.edit" />
                                    </Button>
                                    <br />
                                    <Popup
                                        content={fm({ id: "error.parishNotRemovable" })}
                                        key="deleteNoAlloc"
                                        disabled={!hasAllocations()}
                                        trigger={
                                            <span>
                                                <Button
                                                    id="removeButton"
                                                    value
                                                    onClick={handleDeleteConfirmOpen}
                                                    size="large"
                                                    color="red"
                                                    disabled={hasAllocations()}
                                                    inverted
                                                    icon
                                                    labelPosition="left"
                                                    style={{ fontFamily: "monospace" }}
                                                >
                                                    <Icon name="trash" />
                                                    <FM id="profile.delete" />
                                                </Button>
                                            </span>
                                        }
                                    />
                                </>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }
};

export default ParishProfileHeader;
