import React, { useEffect, useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Button, Confirm, Form, Grid, Header, Message, Segment, Select, TextArea } from "semantic-ui-react";

import UserRole from "../../data/enums/UserRole";
import IUser from "../../data/user/User";
import IUserUnderDecisionData, { NewUserUnderDecisionData } from "../../data/user/UserUnderDecisionData";
import ILabelResponse from "../../requests/response/LabelResponse";
import BoldFM from "../../util/styledMessages/BoldFM";
import CardPlaceholder from "../CardPlaceholder";
import ErrorMsg from "../ErrorMsg";

const getUserAccountSegmentColorByRole = (currentRole: UserRole) => {
    switch (currentRole) {
        case UserRole.OWNER:
            return "violet";
        case UserRole.ADMIN:
            return "blue";
        case UserRole.EDITOR:
            return "green";
        case UserRole.READER:
            return "brown";
        case UserRole.GUEST:
            return "black";
        case UserRole.REFUSED:
            return "red";
        default:
            return "orange";
    }
};

interface IAdminContainerProps {
    activeMenu: string;
    users: IUser[] | undefined;
    loading: boolean;
    fetchShowError: boolean;
    smtpDown: boolean | undefined;
    userUnderDecision: IUserUnderDecisionData;
    postResponse: ILabelResponse | undefined;
    postShowError: boolean;
    deleteResponse: ILabelResponse | undefined;
    deleteShowError: boolean;
    selfID: number | undefined;
    setUserUnderDecision(newUser: IUserUnderDecisionData): void;
    asyncPost(): Promise<void>;
    asyncDelete(url: string): Promise<void>;
}

const AdminContainer: React.FC<IAdminContainerProps> = (props: IAdminContainerProps) => {
    const {
        activeMenu,
        users,
        loading,
        fetchShowError,
        smtpDown,
        userUnderDecision,
        setUserUnderDecision,
        postResponse,
        postShowError,
        asyncPost,
        deleteResponse,
        deleteShowError,
        asyncDelete,
        selfID
    } = props;
    const { formatMessage: fm } = useIntl();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteUserID, setDeleteUserID] = useState();
    const [usersToShow, setUsersToShow] = useState(users);

    useEffect(() => {
        setUsersToShow(users);
    }, [users]);

    const handleAcceptButton = (_: any, { userid }: any) => {
        setUserUnderDecision({ ...userUnderDecision, ID: userid, role: UserRole.GUEST });
    };
    const handleRefuseButton = (_: any, { userid }: any) => {
        setUserUnderDecision({ ...userUnderDecision, ID: userid, role: UserRole.REFUSED });
    };

    const handleChange = (_: any, { name, value }: any) => {
        setUserUnderDecision({ ...userUnderDecision, [name]: value });
    };

    const handleDecisionButton = (_: any) => {
        asyncPost();
        users!.filter((u: IUser) => u.ID === userUnderDecision.ID)[0].role = userUnderDecision.role;
        setUserUnderDecision(NewUserUnderDecisionData);
    };

    const handleDelete = (_: any, { userid }: any) => {
        setConfirmOpen(true);
        setDeleteUserID(userid);
    };

    const handleDeleteConfirm = () => {
        setConfirmOpen(false);
        asyncDelete(`/user/${deleteUserID}`);
        setUsersToShow(usersToShow!.filter((u: IUser) => u.ID !== deleteUserID));
        setDeleteUserID(null);
    };

    const roleOptions = [
        { key: "g", text: fm({ id: "auth.roles.guest" }), value: UserRole.GUEST },
        { key: "r", text: fm({ id: "auth.roles.reader" }), value: UserRole.READER },
        { key: "e", text: fm({ id: "auth.roles.editor" }), value: UserRole.EDITOR },
        { key: "a", text: fm({ id: "auth.roles.admin" }), value: UserRole.ADMIN }
    ];

    if (fetchShowError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading) {
        return <CardPlaceholder />;
    } else if (!usersToShow || usersToShow.length === 0) {
        return (
            <>
                <CardPlaceholder />
                <Header as="h2">
                    <FM id="search.noResult" />
                </Header>
            </>
        );
    } else {
        return (
            <>
                <Confirm
                    content={fm({ id: "confirm.delete.message.account" })}
                    open={confirmOpen}
                    confirmButton={fm({ id: "confirm.delete.confirm" })}
                    onConfirm={handleDeleteConfirm}
                    cancelButton={fm({ id: "confirm.delete.cancel" })}
                    onCancel={() => setConfirmOpen(false)}
                />

                {postResponse ? (
                    <Message negative={postResponse.label.startsWith("error")} positive={postResponse.label.startsWith("info")}>
                        <FM id={postResponse.label} />
                    </Message>
                ) : deleteResponse ? (
                    <Message negative={deleteResponse.label.startsWith("error")} positive={deleteResponse.label.startsWith("info")}>
                        <FM id={deleteResponse.label} />
                    </Message>
                ) : (
                    (postShowError || deleteShowError) && (
                        <Message negative>
                            <FM id="error.connection" />
                        </Message>
                    )
                )}
                {smtpDown && smtpDown === true && (
                    <Message negative>
                        <FM id="error.smtpDown" />
                    </Message>
                )}
                {usersToShow.map(
                    (user: IUser) =>
                        (activeMenu === "all" || activeMenu === user.role || (activeMenu === "admin" && user.role === UserRole.OWNER)) && (
                            <Segment key={user.ID} padded color={getUserAccountSegmentColorByRole(user.role)}>
                                <Grid stackable>
                                    <Grid.Row>
                                        <Grid.Column width="5">
                                            <FM id="auth.name_short" />: <b>{user.name}</b>
                                        </Grid.Column>
                                        <Grid.Column width="5">
                                            e-mail: <b>{user.email}</b>
                                        </Grid.Column>
                                        {user.role !== UserRole.PENDING ? (
                                            <Grid.Column width="5">
                                                <FM id="auth.role_short" />: <BoldFM id={`auth.roles.${user.role}`} />
                                            </Grid.Column>
                                        ) : (
                                            <Grid.Column width="5">
                                                <Button color="violet" inverted onClick={handleAcceptButton} userid={user.ID}>
                                                    <FM id="auth.accept" />
                                                </Button>
                                                <Button inverted secondary onClick={handleRefuseButton} userid={user.ID}>
                                                    <FM id="auth.refuse" />
                                                </Button>
                                            </Grid.Column>
                                        )}
                                        {user.ID !== selfID && user.role !== UserRole.PENDING && user.role !== UserRole.OWNER && (
                                            <Grid.Column width="1">
                                                <Button
                                                    color="red"
                                                    inverted
                                                    circular
                                                    userid={user.ID}
                                                    onClick={handleDelete}
                                                    icon="trash alternate outline"
                                                />
                                            </Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>
                                {userUnderDecision.ID === user.ID && (
                                    <Form>
                                        <TextArea
                                            name="message"
                                            style={{ marginTop: "1em" }}
                                            value={userUnderDecision.message}
                                            placeholder={
                                                userUnderDecision.role !== UserRole.REFUSED
                                                    ? fm({ id: "auth.message.accept" })
                                                    : fm({ id: "auth.message.refuse" })
                                            }
                                            onChange={handleChange}
                                            type="text"
                                        />
                                        {userUnderDecision.role !== UserRole.REFUSED && (
                                            <Form.Group style={{ marginTop: "1em" }} fluid>
                                                <Form.Field readOnly width="3">
                                                    <FM id="auth.role" />
                                                </Form.Field>
                                                <Form.Field
                                                    width="6"
                                                    name="role"
                                                    value={userUnderDecision.role}
                                                    placeholder={fm({ id: "auth.role" })}
                                                    onChange={handleChange}
                                                    type="select"
                                                    fluid
                                                    control={Select}
                                                    options={roleOptions}
                                                />
                                            </Form.Group>
                                        )}
                                        <Form.Button color="violet" size="large" style={{ marginTop: "1em" }} onClick={handleDecisionButton}>
                                            <FM id={userUnderDecision.role !== UserRole.REFUSED ? "auth.proceed.accept" : "auth.proceed.refuse"} />
                                        </Form.Button>
                                    </Form>
                                )}
                            </Segment>
                        )
                )}
                {userUnderDecision.ID !== 0 && <div style={{ height: "5em" }} />}
            </>
        );
    }
};

export default AdminContainer;
