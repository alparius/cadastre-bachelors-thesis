import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { NavLink } from "react-router-dom";
import { Container, Divider, Header, Image } from "semantic-ui-react";

import codeSpringLogo from "../../static/images/codespring.jpg";
import proteoLogo from "../../static/images/proteo.jpg";
import ItalicFM from "../../util/styledMessages/ItalicFM";

const WelcomeInformation: React.FC = () => {
    return (
        <>
            <Header as="h1">
                <FM id="menu.title" />
            </Header>
            <Container fluid>
                <FM id="home.sideText1" />
                <br />
                <div style={{ marginTop: "1em" }} />
                <FM id="home.sideText2" />
            </Container>

            <Header as="h3">
                <ItalicFM id="home.sideText3" showColon />
            </Header>
            <Container fluid>
                <FM id="home.sideText4" />
            </Container>
            <Divider />

            <Container textAlign="center">
                <Image size="tiny" href="https://www.codespring.ro" src={codeSpringLogo} />
                <Container as={NavLink} to="https://www.codespring.ro" className="hoverLink">
                    https://www.codespring.ro
                </Container>

                <Image size="tiny" href="http://www.proteo.cj.edu.ro" src={proteoLogo} />
                <Container as={NavLink} to="http://www.proteo.cj.edu.ro" className="hoverLink">
                    http://www.proteo.cj.edu.ro
                </Container>
            </Container>
            <Divider />

            <Container textAlign="center">
                <FM id="home.footer1" />
            </Container>
        </>
    );
};

export default WelcomeInformation;
