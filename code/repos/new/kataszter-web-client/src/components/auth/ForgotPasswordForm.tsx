import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Form, Grid, Message } from "semantic-ui-react";

import IForgotPasswordData from "../../data/user/ForgotPasswordData";
import ILabelResponse from "../../requests/response/LabelResponse";

interface IForgotPasswordProps {
    emailData: IForgotPasswordData;
    response: ILabelResponse | undefined;
    setUser(newUser: IForgotPasswordData): void;
    asyncPost(): Promise<void>;
}

const ForgotPasswordForm: React.FC<IForgotPasswordProps> = (props: IForgotPasswordProps) => {
    const { emailData, setUser, response, asyncPost } = props;
    const { formatMessage: fm } = useIntl();

    const [errorMsgs, setErrorMsgs] = useState(new Array<string>());
    const [fieldErrors, setFieldErrors] = useState(new Array<string>());

    const handleChange = (_: any, { name, value }: any) => {
        setUser({ ...emailData, [name]: value });
    };

    const handleForgotPasswordButton = () => {
        const tobeFieldErrors = new Array<string>();
        const tobeErrorMsgs = new Array<string>();

        if (emailData.email === "") {
            tobeFieldErrors.push(emailData.email);
        }
        if (tobeFieldErrors.length !== 0) {
            tobeErrorMsgs.push("formError.emptyFields");
        }

        if (!emailData.email.includes("@")) {
            tobeErrorMsgs.push("formError.invalidEmail");
            tobeFieldErrors.push("email");
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

    return (
        <Grid textAlign="center">
            <Grid.Row>
                <FM id={"auth.registerpage.forgetPasswordMessage"} />
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
                            error={fieldErrors.includes("email")}
                            type="text"
                            name="email"
                            placeholder={fm({ id: "auth.email" })}
                            value={emailData.email}
                            onChange={handleChange}
                            fluid
                            icon="user"
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
};

export default ForgotPasswordForm;
