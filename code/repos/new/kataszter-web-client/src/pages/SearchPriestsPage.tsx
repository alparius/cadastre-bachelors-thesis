import React, { useState } from "react";
import { Redirect } from "react-router";

import SearchPriestsContainer from "../components/search-priest/SearchPriestsContainer";
import SearchPriestsController from "../components/search-priest/SearchPriestsController";
import IPriestFilters, { filterEndYear, filterStartYear } from "../data/priest/PriestFilters";
import IPriestMin from "../data/priest/PriestMin";
import useFetchData from "../requests/useFetchData";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

const SearchPriestsPage: React.FC = () => {
    const params = new URLSearchParams(window.location.search);

    const initCurrentPage: number = Number(params.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initCurrentPage);
    const resetPagination = () => {
        setCurrentPage(1);
    };

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
            return prev + entry[0] + "=" + encodeURIComponent(entry[1]) + "&";
        }
    }, "");

    const { response, loading, showError } = useFetchData<IPriestMin[]>(`/priests?${filterURL}`);

    return (
        <>
            <Redirect to={`/priests/search?${filterURL}page=${currentPage}`} />
            <PageWrapperTwoColumns>
                <SearchPriestsController filters={filters} setFilters={setFilters} resetPagination={resetPagination} />
                <SearchPriestsContainer
                    priests={response}
                    loading={loading}
                    showError={showError}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </PageWrapperTwoColumns>
        </>
    );
};

export default SearchPriestsPage;
