import React, { useEffect, useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { Form, Grid, Header, Loader, Message } from "semantic-ui-react";

import IRegisterUserData from "../../data/user/RegisterUserData";
import ILabelResponse from "../../requests/response/LabelResponse";
import WrappedRecaptcha from "./WrappedRecaptcha";

interface IRegisterFormProps {
    user: IRegisterUserData;
    response: ILabelResponse | undefined;
    recaptchaToken: string;
    setUser(newUser: IRegisterUserData): void;
    postRegister(recaptchaToken: string): Promise<void>;
    setResponse(resp: ILabelResponse | undefined): void;
    setRecaptchaToken(recaptchaToken: string): void;
}

const RegisterForm: React.FC<IRegisterFormProps> = (props: IRegisterFormProps) => {
    const { user, response, recaptchaToken, setUser, postRegister, setResponse, setRecaptchaToken } = props;
    const { formatMessage: fm } = useIntl();

    const [errorMsgs, setErrorMsgs] = useState(new Array<string>());
    const [fieldErrors, setFieldErrors] = useState(new Array<string>());
    const [showLoader, setShowLoader] = useState(false);
    const [recaptchDOMKey, setRecaptchaDOMKey] = useState(0);

    useEffect(() => {
        if (response && response.label.startsWith("error")) {
            setRecaptchaDOMKey((prevCount) => prevCount + 1);
        }
    }, [response, setRecaptchaToken]);

    const handleRecaptcha = (value: string) => {
        setRecaptchaToken(value);
    };

    const handleChange = (_: any, { name, value }: any) => {
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        if (response) {
            setShowLoader(false);
        }
    }, [response]);

    const handleRegisterButton = () => {
        setShowLoader(true);
        setErrorMsgs(new Array<string>());
        setFieldErrors(new Array<string>());
        setResponse(undefined);

        const tobeFieldErrors = new Array<string>();
        const tobeErrorMsgs = new Array<string>();

        Object.entries({ ...user, recaptchaToken: "placeholder" }).forEach((field: [string, string]) => {
            if (field[1] === "") {
                tobeFieldErrors.push(field[0]);
            }
        });
        if (tobeFieldErrors.length !== 0) {
            tobeErrorMsgs.push("formError.emptyFields");
        }

        if (user.password !== user.password2) {
            tobeErrorMsgs.push("formError.passwordMismatch");
            tobeFieldErrors.push("password2");
        }

        if (!user.email.includes("@")) {
            tobeErrorMsgs.push("formError.invalidEmail");
            tobeFieldErrors.push("email");
        }

        if (recaptchaToken === "") {
            tobeErrorMsgs.push("error.recaptcha");
            tobeFieldErrors.push("recaptcha");
        }

        if (tobeFieldErrors.length === 0) {
            postRegister(recaptchaToken);
            setErrorMsgs(new Array<string>());
            setFieldErrors(new Array<string>());
        } else {
            setShowLoader(false);
            setFieldErrors(tobeFieldErrors);
            setErrorMsgs(tobeErrorMsgs);
        }
    };

    return (
        <Grid textAlign="center">
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
                            error={fieldErrors.includes("name")}
                            name="name"
                            value={user.name}
                            placeholder={fm({ id: "auth.name" })}
                            onChange={handleChange}
                            type="text"
                            fluid
                            icon="address card outline"
                            iconPosition="left"
                        />
                        <Form.Input
                            error={fieldErrors.includes("email")}
                            name="email"
                            value={user.email}
                            placeholder={fm({ id: "auth.email" })}
                            onChange={handleChange}
                            type="text"
                            fluid
                            icon="user outline"
                            iconPosition="left"
                        />
                        <Form.Input
                            error={fieldErrors.includes("password")}
                            name="password"
                            value={user.password}
                            placeholder={fm({ id: "auth.password" })}
                            onChange={handleChange}
                            type="password"
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />
                        <Form.Input
                            error={fieldErrors.includes("password2")}
                            name="password2"
                            value={user.password2}
                            placeholder={fm({ id: "auth.password2" })}
                            onChange={handleChange}
                            type="password"
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />
                        <Form.TextArea
                            error={fieldErrors.includes("message")}
                            name="message"
                            value={user.message}
                            placeholder={fm({ id: "auth.message.please" })}
                            onChange={handleChange}
                            type="text"
                        />

                        <WrappedRecaptcha domkey={recaptchDOMKey} handleRecaptcha={handleRecaptcha} />

                        <Loader active={showLoader} size="large" inline />

                        <Form.Button color="violet" fluid size="large" onClick={handleRegisterButton} style={{ marginTop: "3em" }}>
                            <FM id="auth.registerpage.register" />
                        </Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Header as="h3">
                        <FM id="auth.registerpage.loginCall" />{" "}
                        <NavLink to="/login" className="hoverLink">
                            <FM id="auth.registerpage.login" />
                        </NavLink>
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default RegisterForm;
