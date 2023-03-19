import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Feed, Grid, Header, Icon } from "semantic-ui-react";
import IQualification from "../../../data/priest/Qualification";
import DateDisplay from "../../DateDisplay";

interface ILifpathQualificationListProps {
    qualifications: IQualification[];
}

const LifepathQualificationList: React.FC<ILifpathQualificationListProps> = (props: ILifpathQualificationListProps) => {
    const { qualifications } = props;
    if (!qualifications || qualifications.length === 0) {
        return <></>;
    } else {
        return (
            <Grid columns={2}>
                <Grid.Row centered>
                    <Header size="medium">
                        <FM id="profile.qualifications" />
                    </Header>
                </Grid.Row>
                <Grid.Column verticalAlign="middle" textAlign="right">
                    <Icon circular size="huge" color="violet" name="puzzle piece" />
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                    {qualifications.map((_, index: number) => (
                        <Feed key={index}>
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Date>
                                        <DateDisplay date={qualifications[index].genesisDate} />
                                    </Feed.Date>
                                    <Feed.Summary>{qualifications[index].diplomaName}</Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    ))}
                </Grid.Column>
            </Grid>
        );
    }
};

export default LifepathQualificationList;
