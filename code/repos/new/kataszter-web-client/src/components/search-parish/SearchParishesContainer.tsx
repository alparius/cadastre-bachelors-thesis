import { LatLngExpression } from "leaflet";
import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Card, Container, Header, Icon, Pagination } from "semantic-ui-react";

import { NavLink } from "react-router-dom";
import IParishMin from "../../data/parish/ParishMin";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import CardPlaceholder from "../CardPlaceholder";
import ErrorMsg from "../ErrorMsg";
import ParishCard from "./ParishCard";

const PAGESIZE: number = 10;

interface ISearchParishesContainerProps {
    parishes: IParishMin[] | undefined;
    loading: IParishMin[] | boolean;
    showError: boolean;
    isListView: boolean;
    currentPage: number;
    setCurrentPage(newPage: number): void;
}

const SearchParishesContainer: React.FC<ISearchParishesContainerProps> = (props: ISearchParishesContainerProps) => {
    const { parishes, loading, showError, isListView, currentPage, setCurrentPage } = props;
    const { formatMessage: fm } = useIntl();

    const handlePageChange = (_: any, { activePage }: any) => setCurrentPage(activePage);

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading) {
        return <CardPlaceholder />;
    } else if (!parishes || parishes.length === 0) {
        return (
            <>
                <CardPlaceholder />
                <Header as="h2">
                    <FM id="search.noResult" />
                </Header>
            </>
        );
    } else if (!isListView) {
        const noMap =
            parishes.length -
            parishes.filter((parish: IParishMin) => parish.coordinates.lat !== undefined && parish.coordinates.lng !== undefined).length;

        return (
            <>
                <Header as="h2">
                    {parishes.length} <FM id="search.parishResult" />
                    {noMap > 0 && <FM id="search.parishResultNoCoordinates" values={{ noMap }} />}
                </Header>
                <Header as="h5" style={{ marginTop: "-1em" }}>
                    <FM id="search.switchView" />
                </Header>
                <Map className="markercluster-map" center={{ lat: 46.769, lng: 23.589 } as LatLngExpression} zoom={7}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup maxClusterRadius={15} showCoverageOnHover={false} removeOutsideVisibleBounds>
                        {parishes.map(
                            (parish: IParishMin) =>
                                parish.coordinates.lat &&
                                parish.coordinates.lng && (
                                    <Marker position={[parish.coordinates.lat, parish.coordinates.lng]} key={parish.ID}>
                                        <Popup>
                                            <Header as="h2" className="hoverLink">
                                                <NavLink to={`/parishes/profile/${parish.ID}`}>{parish.name}</NavLink>
                                            </Header>
                                            <Container>
                                                <FM id="label.numberOfPriests" />:{" "}
                                                {parish.numberOfPriests ? parish.numberOfPriests : <ItalicFM id="general.noData" />}
                                                <br />
                                                <FM id="label.parish.cityName" />:{" "}
                                                {parish.cityName ? parish.cityName : <ItalicFM id="general.noData" />}
                                                <span style={{ float: "right" }}>
                                                    {parish.verified ? (
                                                        <>
                                                            {fm({ id: "profile.verified.isVerifiedPopupShort" })}{" "}
                                                            <Icon name="check circle outline" fitted color="green" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            {fm({ id: "profile.verified.notVerifiedPopupShort" })}{" "}
                                                            <Icon name="question circle outline" fitted color="grey" />
                                                        </>
                                                    )}
                                                </span>
                                            </Container>
                                        </Popup>
                                        <Tooltip>{parish.name}</Tooltip>
                                    </Marker>
                                )
                        )}
                    </MarkerClusterGroup>
                </Map>
            </>
        );
    } else {
        return (
            <>
                {currentPage === 1 && (
                    <Header as="h2">
                        {parishes.length} <FM id="search.parishResult" />
                    </Header>
                )}
                <Card.Group stackable doubling itemsPerRow={2}>
                    {parishes.slice((currentPage - 1) * PAGESIZE, currentPage * PAGESIZE).map((parish: IParishMin) => (
                        <ParishCard key={parish.ID} parish={parish} />
                    ))}
                </Card.Group>
                <Container textAlign="center" style={{ marginTop: "3em" }}>
                    <Pagination activePage={currentPage} totalPages={Math.ceil(parishes.length / PAGESIZE)} onPageChange={handlePageChange} />
                </Container>
            </>
        );
    }
};

export default SearchParishesContainer;
