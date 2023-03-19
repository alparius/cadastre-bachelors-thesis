import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Card, Container, Header, Pagination } from "semantic-ui-react";

import IPriestMin from "../../data/priest/PriestMin";
import CardPlaceholder from "../CardPlaceholder";
import ErrorMsg from "../ErrorMsg";
import PriestCard from "./PriestCard";

const PAGESIZE: number = 10;

interface ISearchPriestsContainerProps {
    priests: IPriestMin[] | undefined;
    loading: boolean;
    showError: boolean;
    currentPage: number;
    setCurrentPage(newPage: number): void;
}

const SearchPriestsContainer: React.FC<ISearchPriestsContainerProps> = (props: ISearchPriestsContainerProps) => {
    const { priests, loading, showError, currentPage, setCurrentPage } = props;

    const handlePageChange = (_: any, { activePage }: any) => setCurrentPage(activePage);

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading) {
        return <CardPlaceholder />;
    } else if (!priests || priests.length === 0) {
        return (
            <>
                <CardPlaceholder />
                <Header as="h2">
                    <FM id="search.noResult" />
                </Header>
            </>
        );
    } else {
        return (
            <>
                {currentPage === 1 && (
                    <Header as="h2">
                        {priests.length} <FM id="search.size" />
                    </Header>
                )}
                <Card.Group stackable doubling itemsPerRow={2}>
                    {priests.slice((currentPage - 1) * PAGESIZE, currentPage * PAGESIZE).map((priest: IPriestMin) => (
                        <PriestCard key={priest.ID} priest={priest} />
                    ))}
                </Card.Group>
                <Container textAlign="center" style={{ marginTop: "3em" }}>
                    <Pagination activePage={currentPage} totalPages={Math.ceil(priests.length / PAGESIZE)} onPageChange={handlePageChange} />
                </Container>
            </>
        );
    }
};

export default SearchPriestsContainer;
