import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { Card, Header, Icon, Popup } from "semantic-ui-react";

import IParishMin from "../../data/parish/ParishMin";
import ItalicFM from "../../util/styledMessages/ItalicFM";

interface IParishCardProps {
    parish: IParishMin;
}

const ParishCard: React.FC<IParishCardProps> = (props: IParishCardProps) => {
    const { parish } = props;
    const { formatMessage: fm } = useIntl();

    return (
        <Card key={parish.ID} fluid as={NavLink} to={`/parishes/profile/${parish.ID}`}>
            <Card.Content>
                <Card.Header>
                    <Header as="h2">
                        {parish.name}
                        <span style={{ float: "right" }}>
                            {parish.verified ? (
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
                <Card.Description>
                    <Card.Content>
                        <FM id="label.numberOfPriests" />: {parish.numberOfPriests ? parish.numberOfPriests : <ItalicFM id="general.noData" />}
                        <br />
                        <FM id="label.parish.cityName" />: {parish.cityName ? parish.cityName : <ItalicFM id="general.noData" />}
                    </Card.Content>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default ParishCard;
