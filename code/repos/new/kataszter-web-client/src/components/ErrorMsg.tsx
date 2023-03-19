import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { NavLink } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

interface IErrorMsgProps {
    errorMessage?: string;
}

const ErrorMsg: React.FC<IErrorMsgProps> = (props: IErrorMsgProps) => {
    const { errorMessage } = props;

    return (
        <Container style={{ marginTop: "7em" }}>
            <Header as="h2" className="red">
                {errorMessage ? <FM id={errorMessage} /> : <FM id="error.basic" />}
            </Header>

            <Header as="h3">
                <NavLink to="/" className="hoverLink">
                    <FM id="error.backHome" />
                </NavLink>
            </Header>
        </Container>
    );
};

export default ErrorMsg;
