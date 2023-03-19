import React, { useState } from "react";
import { Redirect } from "react-router";

import ChartContainer from "../components/chart/ChartContainer";
import SearchPriestsController from "../components/search-priest/SearchPriestsController";
import IPriestChartData from "../data/priest/PriestChartData";
import IPriestFilters, { filterEndYear, filterStartYear } from "../data/priest/PriestFilters";
import useFetchData from "../requests/useFetchData";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

const ChartPage: React.FC = () => {
    const params = new URLSearchParams(window.location.search);

    const initPriestName: string = params.get("name") || "";
    const initBirthTown: string = params.get("birthTown") || "";
    const initPlacement: string = params.get("placement") || "";
    const initArea: string = params.get("area") || "";
    const initActiveStart: string = params.get("activeStart") || filterStartYear.toString();
    const initActiveEnd: string = params.get("activeEnd") || filterEndYear.toString();
    const initBirthStart: string = params.get("birthStart") || filterStartYear.toString();
    const initBirthEnd: string = params.get("birthEnd") || filterEndYear.toString();
    const initDeathStart: string = params.get("deathStart") || filterStartYear.toString();
    const initDeathEnd: string = params.get("deathEnd") || filterEndYear.toString();
    const initSubscriptionStart: string = params.get("subscriptionStart") || filterStartYear.toString();
    const initSubscriptionEnd: string = params.get("subscriptionEnd") || filterEndYear.toString();
    const initGraduationStart: string = params.get("graduationStart") || filterStartYear.toString();
    const initGraduationEnd: string = params.get("graduationEnd") || filterEndYear.toString();
    const initFilters: IPriestFilters = {
        name: initPriestName,
        birthTown: initBirthTown,
        placement: initPlacement,
        area: initArea,
        activeStart: initActiveStart,
        activeEnd: initActiveEnd,
        birthStart: initBirthStart,
        birthEnd: initBirthEnd,
        deathStart: initDeathStart,
        deathEnd: initDeathEnd,
        subscriptionStart: initSubscriptionStart,
        subscriptionEnd: initSubscriptionEnd,
        graduationStart: initGraduationStart,
        graduationEnd: initGraduationEnd
    };
    const [filters, setFilters] = useState(initFilters);

    const filterURL = Object.entries(filters).reduce((prev: string, entry: [string, string]) => {
        if (
            entry[1] === "" ||
            (entry[0].includes("Start") && entry[1] === filterStartYear.toString()) ||
            (entry[0].includes("End") && entry[1] === filterEndYear.toString())
        ) {
            return prev;
        } else {
            return prev + entry[0] + "=" + entry[1] + "&";
        }
    }, "");

    const { response, loading, showError } = useFetchData<IPriestChartData[]>(`/priests?${filterURL}&chart=yes`);

    return (
        <>
            <Redirect to={`/charts?${filterURL}`} />
            <PageWrapperTwoColumns>
                <SearchPriestsController
                    chartPage
                    filters={filters}
                    setFilters={setFilters}
                    resetPagination={() => {
                        return;
                    }}
                />
                <ChartContainer priests={response} loading={loading} showError={showError} />
            </PageWrapperTwoColumns>
        </>
    );
};

export default ChartPage;
