import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Card, Divider, Grid } from "semantic-ui-react";
import IDate from "../../../data/Date";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import ErrorMsg from "../../ErrorMsg";
import ProfilePlaceholder from "../../ProfilePlaceholder";
import LifepathAssistantPlacementList from "./LifepathAssistantPlacementList";
import LifepathChildrenList from "./LifepathChildrenList";
import LifepathMainPlacementList from "./LifepathMainPlacementList";
import LifepathMarriageList from "./LifepathMarriageList";
import LifepathQualificationList from "./LifepathQualificationList";
import PriestLifepathEvent from "./PriestLifepathEvent";

interface IPriestLifepathContainerProps {
    priest: IPriestProfileData;
    loading: boolean;
    showError: boolean;
}

function dateExists(date: IDate) {
    return date.comment || date.year;
}

const PriestLifepathContainer: React.FC<IPriestLifepathContainerProps> = (props: IPriestLifepathContainerProps) => {
    const { priest, loading, showError } = props;
    const { formatMessage: fm } = useIntl();

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading || !priest) {
        return <ProfilePlaceholder />;
    } else {
        return (
            <Card centered raised fluid>
                <Card.Content>
                    <Card.Header>
                        <Grid centered columns={1}>
                            <Grid.Column verticalAlign="middle">
                                {priest.name}
                                <FM id="label.priest.lifepath.lifeEvents" />
                            </Grid.Column>
                        </Grid>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    {dateExists(priest.birthDate) && !(!priest.birthCounty && !priest.birthTown) && (
                        <>
                            <PriestLifepathEvent
                                iconName="birthday cake"
                                eventDate={priest.birthDate}
                                eventSummary={priest.name + " " + fm({ id: "label.priest.lifepath.born" }) + "."}
                            />
                            <Divider />
                        </>
                    )}
                    {dateExists(priest.subscriptionDate) && (
                        <>
                            <PriestLifepathEvent
                                iconName="university"
                                eventDate={priest.subscriptionDate}
                                eventSummary={fm({ id: "label.priest.lifepath.subscribedToTheology" }) + "."}
                            />
                            <Divider />
                        </>
                    )}
                    {dateExists(priest.graduationDate) && (
                        <>
                            <PriestLifepathEvent
                                iconName="graduation cap"
                                eventDate={priest.graduationDate}
                                eventSummary={fm({ id: "label.priest.lifepath.graduated" }) + "."}
                            />
                            <Divider />
                        </>
                    )}
                    {dateExists(priest.consecration.date) && priest.consecration.place && (
                        <>
                            <PriestLifepathEvent
                                iconName="trophy"
                                eventDate={priest.consecration.date}
                                eventSummary={
                                    priest.consecration.place
                                        ? priest.name +
                                          " " +
                                          fm({ id: "label.priest.lifepath.consecration" }) +
                                          " " +
                                          fm({ id: "general.in" }) +
                                          " " +
                                          priest.consecration.place +
                                          "."
                                        : priest.name + " " + fm({ id: "label.priest.lifepath.consecration" }) + "."
                                }
                            />
                            <Divider />
                        </>
                    )}
                    <LifepathQualificationList qualifications={priest.qualifications} />
                    {!priest.qualifications || priest.qualifications.length === 0 ? <></> : <Divider />}
                    <LifepathAssistantPlacementList placements={priest.assistantPriestPlaces} />
                    {!priest.assistantPriestPlaces || priest.assistantPriestPlaces.length === 0 ? <></> : <Divider />}
                    <LifepathMainPlacementList placements={priest.mainPriestPlaces} />
                    {!priest.mainPriestPlaces || priest.mainPriestPlaces.length === 0 ? <></> : <Divider />}
                    <LifepathMarriageList spouses={priest.spouses} />
                    {!priest.spouses || priest.spouses.length === 0 ? <></> : <Divider />}
                    <LifepathChildrenList children={priest.children} />
                    {!priest.children || priest.children.length === 0 ? <></> : <Divider />}
                    <PriestLifepathEvent
                        iconName="hourglass half"
                        eventDate={priest.retirementDate}
                        eventSummary={
                            priest.name +
                            " " +
                            (!dateExists(priest.retirementDate)
                                ? fm({ id: "label.priest.lifepath.stillActive" })
                                : fm({ id: "label.priest.lifepath.retired" })) +
                            "."
                        }
                    />
                    <Divider />
                    {dateExists(priest.deathDate) && (
                        <PriestLifepathEvent
                            iconName="heartbeat"
                            eventDate={priest.deathDate}
                            eventSummary={priest.name + " " + fm({ id: "label.priest.lifepath.death" }) + "."}
                        />
                    )}
                </Card.Content>
            </Card>
        );
    }
};

export default PriestLifepathContainer;
