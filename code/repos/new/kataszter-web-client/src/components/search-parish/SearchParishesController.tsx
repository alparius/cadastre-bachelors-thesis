import React from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Form, Grid, Header } from "semantic-ui-react";

import IParishFilters from "../../data/parish/ParishFilters";
import BoldFM from "../../util/styledMessages/BoldFM";

interface ISearchParishesControllerProps {
    filters: IParishFilters;
    isListView: boolean;
    setFilters(newFilters: object): void;
    toggleMap(): void;
    resetPagination(): void;
}

const SearchParishesController: React.FC<ISearchParishesControllerProps> = (props: ISearchParishesControllerProps) => {
    const { filters, isListView, setFilters, toggleMap, resetPagination } = props;
    const { formatMessage: fm } = useIntl();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        resetPagination();
    };

    return (
        <Form>
            <Header as="h1" className="controllerHeader">
                <FM id="search.parishes" />
            </Header>

            <Grid>
                <Grid.Row unstackable style={{ marginBottom: "1.5em", marginTop: "1.5em" }} columns={2}>
                    <Grid.Column textAlign="right">
                        <BoldFM id="label.listView" />
                    </Grid.Column>
                    <Grid.Column textAlign="left">
                        <Form.Checkbox id="listView" name="toggleListView" toggle checked={isListView} onChange={toggleMap} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form.Input id="name" name="parishName" label={fm({ id: "label.name" })} value={filters.parishName} onChange={handleChange} />
            <Form.Input id="city" name="cityName" label={fm({ id: "label.parish.cityName" })} value={filters.cityName} onChange={handleChange} />
            <Form.Input
                name="minSize"
                type="number"
                label={fm({ id: "search.minSize" })}
                value={filters.minSize ? Number(filters.minSize) : undefined}
                onChange={handleChange}
            />
        </Form>
    );
};

export default SearchParishesController;
