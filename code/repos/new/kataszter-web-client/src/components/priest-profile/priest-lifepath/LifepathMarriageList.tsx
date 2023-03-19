import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Feed, Grid, Header, Icon } from "semantic-ui-react";
import ISpouse from "../../../data/priest/Spouse";
import DateDisplay from "../../DateDisplay";

interface ILifepathMarriageListProps {
    spouses: ISpouse[];
}

const LifepathMarriageList: React.FC<ILifepathMarriageListProps> = (props: ILifepathMarriageListProps) => {
    const { spouses } = props;
    if (!spouses || spouses.length === 0) {
        return <></>;
    } else {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Header size="medium">
                        <FM id="label.priest.lifepath.marriage" />
                    </Header>
                </Grid.Row>
                <Grid.Column verticalAlign="middle" textAlign="right">
                    <Icon circular size="huge" color="violet" name="heart" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    {spouses.map((_, index: number) => (
                        <Feed key={index}>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Date>
                                        <DateDisplay date={spouses[index].marriageDate} />
                                    </Feed.Date>
                                    <Feed.Summary>
                                        <FM id="label.priest.lifepath.marriedWith" /> {spouses[index].name}.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    ))}
                </Grid.Column>
            </Grid>
        );
    }
};

export default LifepathMarriageList;
