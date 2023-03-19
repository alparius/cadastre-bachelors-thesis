import React from "react";
import { Divider, Grid, Placeholder, PlaceholderImage } from "semantic-ui-react";

const ProfilePlaceholder: React.FC = () => {
    const placeholderLines = [];

    for (let i = 0; i < 8; i++) {
        placeholderLines.push(
            <Grid.Row key={i}>
                <Grid.Column />
                <Grid.Column>
                    <Placeholder>
                        <Placeholder.Line length={"medium"} />
                    </Placeholder>
                </Grid.Column>
                <Grid.Column>
                    <Placeholder>
                        <Placeholder.Line length={"medium"} />
                    </Placeholder>
                </Grid.Column>
                <Grid.Column />
            </Grid.Row>
        );
    }

    return (
        <>
            <Grid columns={4}>
                <Grid.Column />
                <Grid.Column>
                    <Placeholder>
                        <PlaceholderImage rectangular />
                    </Placeholder>
                </Grid.Column>
                <Grid.Column>
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>
                </Grid.Column>
                <Grid.Column />
            </Grid>
            <Divider />
            <Grid columns={4}>{placeholderLines}</Grid>
        </>
    );
};
export default ProfilePlaceholder;
