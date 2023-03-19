import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Feed, Grid, Header, Icon } from "semantic-ui-react";
import IChild from "../../../data/priest/Child";
import DateDisplay from "../../DateDisplay";

interface ILifepathChildrenListProps {
    children: IChild[];
}

const LifepathChildrenList: React.FC<ILifepathChildrenListProps> = (props: ILifepathChildrenListProps) => {
    const { children } = props;
    const { formatMessage: fm } = useIntl();
    if (!children || children.length === 0) {
        return <></>;
    } else {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Header size="medium">
                        <FM id="profile.children" />
                    </Header>
                </Grid.Row>
                <Grid.Column verticalAlign="middle" textAlign="right">
                    <Icon circular size="huge" color="violet" name="child" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    {children.map((_, index: number) => (
                        <Feed key={index}>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Date>
                                        <DateDisplay date={children[index].birthDate} />
                                    </Feed.Date>
                                    <Feed.Summary>
                                        {children[index].name}
                                        {children[index].birthPlace
                                            ? fm({ id: "label.priest.lifepath.birthPlace" }) + " " + children[index].birthPlace
                                            : ""}
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

export default LifepathChildrenList;
