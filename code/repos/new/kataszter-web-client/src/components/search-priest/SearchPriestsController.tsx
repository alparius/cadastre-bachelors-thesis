import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { FormattedMessage as FM, useIntl } from "react-intl";
import { Form, Header, Icon } from "semantic-ui-react";

import IPriestFilters, { filterEndYear, filterStartYear } from "../../data/priest/PriestFilters";
import BoldFM from "../../util/styledMessages/BoldFM";

const refreshButtonProps = {
    name: "refresh",
    basic: true,
    circular: true,
    compact: true,
    icon: true
};

interface ISearchPriestsControllerProps {
    chartPage?: boolean;
    filters: IPriestFilters;
    setFilters(newFilters: object): void;
    resetPagination(): void;
}

const SearchPriestsController: React.FC<ISearchPriestsControllerProps> = (props: ISearchPriestsControllerProps) => {
    const { chartPage, filters, setFilters, resetPagination } = props;
    const { formatMessage: fm } = useIntl();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        resetPagination();
    };

    const handleRangeChange = (value: any, startLabel: string, endLabel: string) => {
        setFilters({ ...filters, [startLabel]: value.min.toString(), [endLabel]: value.max.toString() });
    };

    const resetRanges = (startLabel: string, endLabel: string) => {
        setFilters({ ...filters, [startLabel]: filterStartYear.toString(), [endLabel]: filterEndYear.toString() });
    };

    return (
        <Form>
            <Header as="h1" className="controllerHeader">
                {chartPage ? <FM id="charts.title" /> : <FM id="search.priests" />}
            </Header>
            <Form.Input id="name" name="name" label={fm({ id: "label.name" })} value={filters.name} onChange={handleChange} />
            <Form.Input id="birthTown" name="birthTown" label={fm({ id: "label.birthTown" })} value={filters.birthTown} onChange={handleChange} />
            <Form.Input id="placement" name="placement" label={fm({ id: "label.placement" })} value={filters.placement} onChange={handleChange} />
            <Form.Input
                id="area"
                name="area"
                label={fm({ id: "label.area" })}
                value={filters.area}
                onChange={handleChange}
                style={{ marginBottom: "0.5em" }}
            />

            <BoldFM style={{ fontSize: "13px" }} id="label.priest.activeYears" />
            <Form.Group style={{ marginTop: "0.5em", marginBottom: "2em" }} inline unstackable>
                <Form.Button onClick={() => resetRanges("activeStart", "activeEnd")} {...refreshButtonProps} width={2}>
                    <Icon name="refresh" />
                </Form.Button>
                <Form.Field width={1} />
                <Form.Field width={13}>
                    <InputRange
                        minValue={filterStartYear}
                        maxValue={filterEndYear}
                        onChange={(value: any) => handleRangeChange(value, "activeStart", "activeEnd")}
                        value={{ min: Number(filters.activeStart), max: Number(filters.activeEnd) }}
                    />
                </Form.Field>
            </Form.Group>

            <BoldFM style={{ fontSize: "13px" }} id="label.priest.birthYear" />
            <Form.Group style={{ marginTop: "0.5em", marginBottom: "2em" }} inline unstackable>
                <Form.Button onClick={() => resetRanges("birthStart", "birthEnd")} {...refreshButtonProps} width={2}>
                    <Icon name="refresh" />
                </Form.Button>
                <Form.Field width={1} />
                <Form.Field width={13}>
                    <InputRange
                        minValue={filterStartYear}
                        maxValue={filterEndYear}
                        onChange={(value: any) => handleRangeChange(value, "birthStart", "birthEnd")}
                        value={{ min: Number(filters.birthStart), max: Number(filters.birthEnd) }}
                    />
                </Form.Field>
            </Form.Group>

            <BoldFM style={{ fontSize: "13px" }} id="label.priest.deathYear" />
            <Form.Group style={{ marginTop: "0.5em", marginBottom: "2em" }} inline unstackable>
                <Form.Button onClick={() => resetRanges("deathStart", "deathEnd")} {...refreshButtonProps} width={2}>
                    <Icon name="refresh" />
                </Form.Button>
                <Form.Field width={1} />
                <Form.Field width={13}>
                    <InputRange
                        minValue={filterStartYear}
                        maxValue={filterEndYear}
                        onChange={(value: any) => handleRangeChange(value, "deathStart", "deathEnd")}
                        value={{ min: Number(filters.deathStart), max: Number(filters.deathEnd) }}
                    />
                </Form.Field>
            </Form.Group>

            <BoldFM style={{ fontSize: "13px" }} id="label.priest.subscriptionYear" />
            <Form.Group style={{ marginTop: "0.5em", marginBottom: "2em" }} inline unstackable>
                <Form.Button onClick={() => resetRanges("subscriptionStart", "subscriptionEnd")} {...refreshButtonProps} width={2}>
                    <Icon name="refresh" />
                </Form.Button>
                <Form.Field width={1} />
                <Form.Field width={13}>
                    <InputRange
                        minValue={filterStartYear}
                        maxValue={filterEndYear}
                        onChange={(value: any) => handleRangeChange(value, "subscriptionStart", "subscriptionEnd")}
                        value={{ min: Number(filters.subscriptionStart), max: Number(filters.subscriptionEnd) }}
                    />
                </Form.Field>
            </Form.Group>

            <BoldFM style={{ fontSize: "13px" }} id="label.priest.graduationYear" />
            <Form.Group style={{ marginTop: "0.5em", marginBottom: "2em" }} inline unstackable>
                <Form.Button onClick={() => resetRanges("graduationStart", "graduationEnd")} {...refreshButtonProps} width={2}>
                    <Icon name="refresh" />
                </Form.Button>
                <Form.Field width={1} />
                <Form.Field width={13}>
                    <InputRange
                        minValue={filterStartYear}
                        maxValue={filterEndYear}
                        onChange={(value: any) => handleRangeChange(value, "graduationStart", "graduationEnd")}
                        value={{ min: Number(filters.graduationStart), max: Number(filters.graduationEnd) }}
                    />
                </Form.Field>
            </Form.Group>
        </Form>
    );
};
export default SearchPriestsController;
