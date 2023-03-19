import React from "react";
import { Feed, Grid, Icon } from "semantic-ui-react";
import IDate from "../../../data/Date";
import DateDisplay from "../../DateDisplay";

interface IPriestLifepathEventProps {
    iconName: string;
    eventDate: IDate;
    eventSummary: string;
}

const PriestLifepathEvent: React.FC<IPriestLifepathEventProps> = (props: IPriestLifepathEventProps) => {
    const { iconName, eventDate, eventSummary } = props;
    return (
        <Grid columns={2}>
            <Grid.Column verticalAlign="middle" textAlign="right">
                <Icon circular size="huge" color="violet" name={iconName as any} />
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Date>
                                <DateDisplay date={eventDate} />
                            </Feed.Date>
                            <Feed.Summary>{eventSummary}</Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Grid.Column>
        </Grid>
    );
};

export default PriestLifepathEvent;
