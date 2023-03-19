import React, { useState } from "react";
import { FormattedMessage as FM } from "react-intl";
import { Redirect } from "react-router";
import { Card, Container, Header, Icon, Message } from "semantic-ui-react";

import ErrorMsg from "../components/ErrorMsg";
import CreatePriestForm from "../components/priest-profile/CreatePriestForm";
import PriestCard from "../components/search-priest/PriestCard";
import ICreatePriestData, { NewCreatePriestData } from "../data/priest/CreatePriestData";
import ICreatePriestResponse from "../requests/response/CreatePriestResponse";
import usePost from "../requests/usePost";
import BoldFM from "../util/styledMessages/BoldFM";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

const CreatePriestPage: React.FC = () => {
    const [priest, setPriest] = useState(NewCreatePriestData);

    const { response, showError, asyncPost } = usePost<ICreatePriestData, ICreatePriestResponse>("/priest", priest);

    if (showError) {
        return <ErrorMsg errorMessage="error.connection" />;
    } else if (response && response.label.startsWith("info.duplicate")) {
        return (
            <Container style={{ margin: "3em" }} text>
                <Message icon>
                    <Icon name="add user" color="violet" />
                    <Message.Content>
                        <BoldFM id="insert.priestAlreadyExistsMessage" />
                    </Message.Content>
                </Message>
                <Card.Group stackable itemsPerRow={1}>
                    <PriestCard priest={response.data} />
                </Card.Group>
            </Container>
        );
    } else if (response && response.label.startsWith("info")) {
        return <Redirect to={`/priests/profile/${response.insertedID}`} />;
    } else {
        return (
            <PageWrapperTwoColumns>
                <>
                    <Header as="h1" className="controllerHeader">
                        <FM id="insert.priest" />
                    </Header>
                    <Header as="h3">
                        <FM id="insert.message" />
                    </Header>
                </>
                <CreatePriestForm priest={priest} setPriest={setPriest} asyncPost={asyncPost} response={response} />
            </PageWrapperTwoColumns>
        );
    }
};

export default CreatePriestPage;
