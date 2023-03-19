import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Container, Header, Icon, Placeholder } from "semantic-ui-react";

import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

interface INotFoundPageProps {
    construction?: boolean;
}

const NotFoundPage: React.FC<INotFoundPageProps> = (props: INotFoundPageProps) => {
    const { construction } = props;

    return (
        <PageWrapperTwoColumns>
            <Header as="h1">404</Header>
            <Container>
                {!construction ? (
                    <Header as="h1">
                        <FM id="error.404" />
                    </Header>
                ) : (
                    <div style={{ marginBottom: "5vh" }}>
                        <Header as="h1">
                            <FM id="error.construction" />
                        </Header>
                        <Icon size="large" color="violet" name="road" />
                        <Icon size="large" color="violet" name="ban" />
                        <Icon size="large" color="violet" name="map signs" />
                        <Icon size="large" color="violet" name="angle double right" />
                        <Icon size="large" color="violet" name="exchange" />
                        <Icon size="large" color="violet" name="bullhorn" />
                        <Icon size="large" color="violet" name="calendar" />
                        <Icon size="large" color="violet" name="info" />
                        <Icon size="large" color="violet" name="wrench" />
                        <Icon size="large" color="violet" name="cog" />
                        <Icon size="large" color="violet" name="cogs" />
                        <Icon size="large" color="violet" name="coffee" />
                        <Icon size="large" color="violet" name="tasks" />
                        <Icon size="large" color="violet" name="code" />
                        <Icon size="large" color="violet" name="sitemap" />
                        <Icon size="large" color="violet" name="puzzle piece" />
                        <Icon size="large" color="violet" name="question circle" />
                        <Icon size="large" color="violet" name="user secret" />
                        <Icon size="large" color="violet" name="eye slash" />
                        <Icon size="large" color="violet" name="lock" />
                    </div>
                )}
                <Placeholder fluid>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Container>
        </PageWrapperTwoColumns>
    );
};

export default NotFoundPage;
