import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { Card, Header, Icon, Popup } from "semantic-ui-react";

import IPriestMin from "../../data/priest/PriestMin";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import DateDisplay from "../DateDisplay";
import PriestCardPlacementList from "./PriestCardPlacementList";

interface IPriestCardProps {
    priest: IPriestMin;
}

const PriestCard: React.FC<IPriestCardProps> = (props: IPriestCardProps) => {
    const { priest } = props;
    const { formatMessage: fm } = useIntl();

    return (
        <Card key={priest.ID} fluid as={NavLink} to={`/priests/profile/${priest.ID}`}>
            <Card.Content>
                <Card.Header>
                    <Header as="h2">
                        {priest.name}
                        <span style={{ float: "right" }}>
                            {priest.verified ? (
                                <Popup
                                    content={fm({ id: "profile.verified.isVerifiedPopup" })}
                                    trigger={<Icon name="check circle outline" fitted color="green" />}
                                />
                            ) : (
                                <Popup
                                    content={fm({ id: "profile.verified.notVerifiedPopup" })}
                                    trigger={<Icon name="question circle outline" fitted color="grey" />}
                                />
                            )}
                        </span>
                    </Header>
                </Card.Header>
                <Card.Meta>
                    <FM id="label.born" />: {priest.birthTown ? priest.birthTown : <ItalicFM id="general.noData" />},{" "}
                    <DateDisplay date={priest.birthDate} /> - <FM id="label.died" />: <DateDisplay date={priest.deathDate} />
                </Card.Meta>
                <Card.Meta>
                    {priest.subscriptionDate.year && (
                        <>
                            <FM id="label.subscribed" />: <DateDisplay date={priest.subscriptionDate} />, <FM id="general.and" />{" "}
                        </>
                    )}
                    <FM id="label.graduated" />: <DateDisplay date={priest.graduationDate} />
                </Card.Meta>
                <Card.Meta>
                    <FM id="label.country" />: {priest.birthCountry ? priest.birthCountry : <ItalicFM id="general.noData" />}
                    {", "}
                    <FM id="label.county" />: {priest.birthCounty ? priest.birthCounty : <ItalicFM id="general.noData" />}
                    {", "}
                    <FM id="label.diocese" />: {priest.diocese ? priest.diocese : <ItalicFM id="general.noData" />}
                </Card.Meta>
                <Card.Description style={{ marginTop: "1em" }}>
                    <PriestCardPlacementList places={priest.assistantPriestPlaces} headerKey="label.priest.assistantPlacements" />
                    <PriestCardPlacementList places={priest.mainPriestPlaces} headerKey="label.priest.mainPlacements" />
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default PriestCard;
