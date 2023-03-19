import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { NavLink } from "react-router-dom";
import { List } from "semantic-ui-react";

import IPlacement from "../../data/priest/Placement";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import DateDisplay from "../DateDisplay";

interface IPriestCardPlacementListProps {
    places: IPlacement[];
    headerKey: string;
}

const PriestCardPlacementList: React.FC<IPriestCardPlacementListProps> = (props: IPriestCardPlacementListProps) => {
    const { places, headerKey } = props;

    return (
        <List>
            <List.Item>
                <List.Header>
                    <FM id={headerKey} />
                </List.Header>
            </List.Item>
            {places ? (
                places.map((place: IPlacement, index: number) => (
                    <List.Item key={place.place + index}>
                        {place.place ? (
                            <NavLink to={`/parishes/profile/${place.placeID}`} className="hoverLink">
                                {" "}
                                {place.place}{" "}
                            </NavLink>
                        ) : (
                            <ItalicFM id="general.noData" />
                        )}
                        : <DateDisplay date={place.startDate} /> - <DateDisplay date={place.endDate} />
                    </List.Item>
                ))
            ) : (
                <List.Item>
                    <ItalicFM id="general.noData" />
                </List.Item>
            )}
        </List>
    );
};

export default PriestCardPlacementList;
