import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Grid, Header } from "semantic-ui-react";

import IParishPlacement from "../../../data/parish/ParishPlacement";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";
import DateDisplay from "../../DateDisplay";

interface IParishGeneralPlacementListProps {
    placements: IParishPlacement[];
    headerKey: string;
}

const ParishGeneralPlacementList: React.FC<IParishGeneralPlacementListProps> = (props: IParishGeneralPlacementListProps) => {
    const { placements, headerKey } = props;

    return (
        <>
            <Header as="h2">
                <ItalicFM id={headerKey} />
            </Header>

            <Container style={{ marginBottom: "2em" }}>
                <Grid>
                    {placements ? (
                        <>
                            <Grid.Row columns={4} style={{ marginBottom: "-1em" }}>
                                <Grid.Column>
                                    <BoldFM id="label.name" />
                                </Grid.Column>
                                <Grid.Column>
                                    <BoldFM id="profile.workInterval" />
                                </Grid.Column>
                                <Grid.Column>
                                    {headerKey !== "label.priest.assistantPlacements" && <BoldFM id="profile.numberOfPeople" />}
                                </Grid.Column>
                            </Grid.Row>
                            {placements.map((placement: IParishPlacement, index: number) => (
                                <Grid.Row columns={4} style={{ marginBottom: "-1em" }} key={placement.priestID + index}>
                                    <Grid.Column>
                                        {placement.priestName ? (
                                            <NavLink to={`/priests/profile/${placement.priestID}`} className="hoverLink">
                                                {placement.priestName}
                                            </NavLink>
                                        ) : (
                                            <ItalicFM id="general.noData" />
                                        )}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <DateDisplay date={placement.startDate} /> - <DateDisplay date={placement.endDate} />
                                    </Grid.Column>
                                    <Grid.Column>{placement.numberOfPeople && <i>{placement.numberOfPeople}</i>}</Grid.Column>
                                    <Grid.Column />
                                </Grid.Row>
                            ))}
                        </>
                    ) : (
                        <ItalicFM id="general.noData" />
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default ParishGeneralPlacementList;
