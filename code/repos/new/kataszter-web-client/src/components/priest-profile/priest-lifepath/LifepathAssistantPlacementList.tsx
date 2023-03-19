import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Feed, Grid, Header, Icon } from "semantic-ui-react";
import IPlacement from "../../../data/priest/Placement";
import DateDisplay from "../../DateDisplay";

interface ILifepathAssistantPlacementListProps {
    placements: IPlacement[];
}

const LifepathAssistantPlacementList: React.FC<ILifepathAssistantPlacementListProps> = (props: ILifepathAssistantPlacementListProps) => {
    const { placements } = props;
    if (!placements || placements.length === 0) {
        return <></>;
    } else {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Header size="medium">
                        <FM id="profile.assistantPriestPlaces" />
                    </Header>
                </Grid.Row>
                <Grid.Column verticalAlign="middle" textAlign="right">
                    <Icon circular size="huge" color="violet" name="map signs" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    {placements.map((_, index: number) => (
                        <Feed key={index}>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Date>
                                        <DateDisplay date={placements[index].startDate} /> - <DateDisplay date={placements[index].endDate} />
                                    </Feed.Date>
                                    <Feed.Summary>{placements[index].place}</Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    ))}
                </Grid.Column>
            </Grid>
        );
    }
};

export default LifepathAssistantPlacementList;
