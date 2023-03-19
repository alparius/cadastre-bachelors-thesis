import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Form, Grid, Message } from "semantic-ui-react";

import { Redirect } from "react-router";
import INewPasswordData from "../../data/user/NewPasswordData";
import ILabelResponse from "../../requests/response/LabelResponse";
import usePost from "../../requests/usePost";
import ErrorMsg from "../ErrorMsg";

interface INewPasswordProps {
    password: INewPasswordData;
    tokenId: string;
    setPassword(newPassword: INewPasswordData): void;
}

const NewPasswordForm: React.FC<INewPasswordProps> = (props: INewPasswordProps) => {
    const { password, setPassword, tokenId } = props;
    const { formatMessage: fm } = useIntl();

    const { response, showError, asyncPost } = usePost<INewPasswordData, ILabelResponse>(`/newPassword/${tokenId}`, { ...password });

    const [errorMsgs, setErrorMsgs] = useState(new Array<string>());
    const [fieldErrors, setFieldErrors] = useState(new Array<string>());

    const handleChange = (_: any, { name, value }: any) => {
        setPassword({ ...password, [name]: value });
    };

    const handleForgotPasswordButton = () => {
        const tobeFieldErrors = new Array<string>();
        const tobeErrorMsgs = new Array<string>();

        Object.entries(password).forEach((field: [string, string]) => {
            if (field[1] === "") {
                tobeFieldErrors.push(field[0]);
            }
        });
        if (tobeFieldErrors.length !== 0) {
            tobeErrorMsgs.push("formError.emptyFields");
        }

        if (password.password !== password.confirmPassword) {
            tobeErrorMsgs.push("formError.passwordMismatch");
            tobeFieldErrors.push("confirmPassword");
        }

        if (tobeFieldErrors.length === 0) {
            asyncPost();
            setErrorMsgs(new Array<string>());
            setFieldErrors(new Array<string>());
        } else {
            setFieldErrors(tobeFieldErrors);
            setErrorMsgs(tobeErrorMsgs);
        }
    };

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response && response.label.startsWith("info")) {
        return <Redirect to="/login" />;
    } else {
        return (
            <Grid textAlign="center">
                <Grid.Row>
                    <FM id={"auth.registerpage.newPasswordMessage"} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size="large">
                            {response && (
                                <Message negative>
                                    <FM id={response.label} />
                                </Message>
                            )}
                            {errorMsgs.length !== 0 && (
                                <Message negative>
                                    {errorMsgs.map((msgID: string) => (
                                        <React.Fragment key={msgID}>
                                            <FM id={msgID} />
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </Message>
                            )}
                            <Form.Input
                                error={fieldErrors.includes("password")}
                                name="password"
                                value={password.password}
                                placeholder={fm({ id: "auth.newPassword" })}
                                onChange={handleChange}
                                type="password"
                                fluid
                                icon="lock"
                                iconPosition="left"
                            />
                            <Form.Input
                                error={fieldErrors.includes("confirmPassword")}
                                name="confirmPassword"
                                value={password.confirmPassword}
                                placeholder={fm({ id: "auth.confirmPassword" })}
                                onChange={handleChange}
                                type="password"
                                fluid
                                icon="lock"
                                iconPosition="left"
                            />
                            <Form.Button color="violet" fluid size="large" style={{ marginTop: "3em" }} onClick={handleForgotPasswordButton}>
                                <FM id="general.send" />
                            </Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
};

export default NewPasswordForm;
