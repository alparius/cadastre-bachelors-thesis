import React, { useEffect, useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

import ILoginUserData from "../../data/user/LoginUserData";
import ILabelResponse from "../../requests/response/LabelResponse";
import WrappedRecaptcha from "./WrappedRecaptcha";

interface ILoginFormProps {
    loginUserData: ILoginUserData;
    response: ILabelResponse | undefined;
    recaptchaToken: string;
    postLogin(recaptchaToken: string): Promise<void>;
    setLoginUserData(newLoginUserData: ILoginUserData): void;
    setRecaptchaToken(recaptchaToken: string): void;
}

const LoginForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
    const { loginUserData, response, recaptchaToken, postLogin, setLoginUserData, setRecaptchaToken } = props;
    const { formatMessage: fm } = useIntl();

    const [errorMsgs, setErrorMsgs] = useState(new Array<string>());
    const [fieldErrors, setFieldErrors] = useState(new Array<string>());
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
        setLoginUserData({ ...loginUserData, [name]: value });
    };

    const handleLoginButton = () => {
        setErrorMsgs(new Array<string>());
        setFieldErrors(new Array<string>());

        const tobeFieldErrors = new Array<string>();
        const tobeErrorMsgs = new Array<string>();

        Object.entries({ ...loginUserData, recaptchaToken: "placeholder" }).forEach((field: [string, string]) => {
            if (field[1] === "") {
                tobeFieldErrors.push(field[0]);
            }
        });
        if (tobeFieldErrors.length !== 0) {
            tobeErrorMsgs.push("formError.emptyFields");
        }

        if (!loginUserData.email.includes("@")) {
            tobeErrorMsgs.push("formError.invalidEmail");
            tobeFieldErrors.push("email");
        }

        if (recaptchaToken === "") {
            tobeErrorMsgs.push("error.recaptcha");
            tobeFieldErrors.push("recaptcha");
        }

        if (tobeFieldErrors.length === 0) {
            postLogin(recaptchaToken);
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
                            value={loginUserData.email}
                            onChange={handleChange}
                            fluid
                            icon="user"
                            iconPosition="left"
                        />
                        <Form.Input
                            error={fieldErrors.includes("password")}
                            type="password"
                            name="password"
                            placeholder={fm({ id: "auth.password" })}
                            value={loginUserData.password}
                            onChange={handleChange}
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />
                        <Header as="h5" style={{ marginTop: "0em" }}>
                            <NavLink to="/forgotPassword" className="hoverLink">
                                <FM id="auth.loginpage.forgotPassword" />
                            </NavLink>
                        </Header>

                        <WrappedRecaptcha domkey={recaptchDOMKey} handleRecaptcha={handleRecaptcha} />

                        <Button color="violet" fluid size="large" onClick={handleLoginButton}>
                            <FM id="auth.login" />
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Header as="h3">
                        <FM id="auth.loginpage.registerCall" />{" "}
                        <NavLink to="/register" className="hoverLink">
                            <FM id="auth.loginpage.register" />
                        </NavLink>
                    </Header>
                    <Header as="h4">
                        <FM id="auth.loginpage.registerNote" />
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default LoginForm;
