import React, { useState } from "react";
import { Redirect } from "react-router";

import SearchParishesContainer from "../components/search-parish/SearchParishesContainer";
import SearchParishesController from "../components/search-parish/SearchParishesController";
import IParishFilters from "../data/parish/ParishFilters";
import IParishMin from "../data/parish/ParishMin";
import useFetchData from "../requests/useFetchData";
import PageWrapperTwoColumns from "./PageWrapperTwoColumns";

const SearchParishesPage: React.FC = () => {
    const params = new URLSearchParams(window.location.search);

    const initCurrentPage: number = Number(params.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initCurrentPage);
    const resetPagination = () => {
        setCurrentPage(1);
    };

    const initParishName: string = params.get("name") || "";
    const initCityName: string = params.get("cityName") || "";
    const initMinSize: string = params.get("minSize") || "";
    const initFilters: IParishFilters = {
        parishName: initParishName,
        cityName: initCityName,
        minSize: initMinSize
    };
    const [filters, setFilters] = useState(initFilters);

    const filterURL = Object.entries(filters).reduce((prev: string, entry: [string, string]) => {
        if (entry[1] === "") {
            return prev;
        } else {
            return prev + entry[0] + "=" + encodeURIComponent(entry[1]) + "&";
        }
    }, "");

    const [isListView, setIsListView] = useState(false);
    const toggleMap = () => setIsListView((prevState) => !prevState);

    const { response, loading, showError } = useFetchData<IParishMin[]>(`/parishes?${filterURL}`);

    return (
        <>
            <Redirect to={`/parishes/search?${filterURL}page=${currentPage}`} />
            <PageWrapperTwoColumns>
                <SearchParishesController
                    filters={filters}
                    setFilters={setFilters}
                    isListView={isListView}
                    toggleMap={toggleMap}
                    resetPagination={resetPagination}
                />
                <SearchParishesContainer
                    parishes={response}
                    loading={loading}
                    showError={showError}
                    isListView={isListView}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </PageWrapperTwoColumns>
        </>
    );
};

export default SearchParishesPage;
