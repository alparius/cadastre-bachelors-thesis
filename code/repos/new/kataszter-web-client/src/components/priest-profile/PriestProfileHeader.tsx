import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Confirm, Form, Grid, Header, Icon, Popup } from "semantic-ui-react";

import IPriestProfileData from "../../data/priest/PriestProfileData";
import ProfilePlaceholder from "../ProfilePlaceholder";

interface IPriestProfileHeaderProps {
    priest: IPriestProfileData;
    editMode: boolean;
    isAdmin: boolean;
    handleEditModeChange: (e: any, { value }: any) => void;
    setPriest(newPriest: IPriestProfileData): void;
    asyncDelete(url: string): void;
}

const PriestProfileHeader: React.FC<IPriestProfileHeaderProps> = (props: IPriestProfileHeaderProps) => {
    const { priest, editMode, isAdmin, setPriest, handleEditModeChange, asyncDelete } = props;
    const { formatMessage: fm } = useIntl();

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleDeleteSubmit = () => {
        setDeleteConfirmOpen(false);
        asyncDelete("/priest/" + priest.ID);
    };

    const handleDeleteConfirmOpen = (_: any) => {
        setDeleteConfirmOpen(true);
    };

    const toggleVerified = () => setPriest({ ...priest, verified: !priest.verified });

    if (!priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <>
                <Confirm
                    content={fm({ id: "confirm.delete.message.priest" })}
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
                            <Header as="h1">
                                {priest.name}
                                <span style={{ float: "right" }}>
                                    {editMode && (
                                        <Form.Checkbox
                                            label={fm({ id: "profile.verified.label" })}
                                            name="verified"
                                            toggle
                                            checked={priest.verified}
                                            onChange={toggleVerified}
                                        />
                                    )}
                                    {priest.verified ? (
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
                        </Grid.Column>
                        <Grid.Column />
                        {!editMode && isAdmin && (
                            <Grid.Column width={3}>
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
                                    <Button
                                        id="removeButton"
                                        value
                                        onClick={handleDeleteConfirmOpen}
                                        size="large"
                                        color="red"
                                        inverted
                                        icon
                                        labelPosition="left"
                                        style={{ fontFamily: "monospace" }}
                                    >
                                        <Icon name="trash" />
                                        <FM id="profile.delete" />
                                    </Button>
                                </>
                            </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </>
        );
    }
};

export default PriestProfileHeader;
