import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Redirect } from "react-router";
import { Card, Container, Header, Icon, Message } from "semantic-ui-react";

import ErrorMsg from "../components/ErrorMsg";
import CreateParishForm from "../components/parish-profile/CreateParishForm";
import ParishCard from "../components/search-parish/ParishCard";
import ICreateParishData, { NewCreateParishData } from "../data/parish/CreateParishData";
import ICreateParishResponse from "../requests/response/CreateParishResponse";
import usePost from "../requests/usePost";
import BoldFM from "../util/styledMessages/BoldFM";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

const CreateParishPage: React.FC = () => {
    const [parish, setParish] = useState(NewCreateParishData);

    const { response, showError, asyncPost } = usePost<ICreateParishData, ICreateParishResponse>("/parish", parish);

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response && response.label.startsWith("info.duplicate")) {
        return (
            <Container style={{ margin: "3em" }} text>
                <Message icon>
                    <Icon name="add" color="violet" />
                    <Message.Content>
                        <BoldFM id="insert.parishAlreadyExistsMessage" />
                    </Message.Content>
                </Message>
                <Card.Group stackable itemsPerRow={1}>
                    <ParishCard parish={response.data} />
                </Card.Group>
            </Container>
        );
    } else if (response && response.label.startsWith("info")) {
        return <Redirect to={`/parishes/profile/${response.insertedID}`} />;
    } else {
        return (
            <PageWrapperTwoColumns>
                <>
                    <Header as="h1" className="controllerHeader">
                        <FM id="insert.parish" />
                    </Header>
                    <Header as="h3">
                        <FM id="insert.parishMessage" />
                    </Header>
                </>
                <CreateParishForm parish={parish} setParish={setParish} asyncPost={asyncPost} response={response} />
            </PageWrapperTwoColumns>
        );
    }
};

export default CreateParishPage;
