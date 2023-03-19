import React from "react";
import { FormattedMessage as FM } from "react-intl";

export const chartNameList = [
    { key: "line", text: <FM id="charts.line" />, value: "line" },
    { key: "pie", text: <FM id="charts.pie" />, value: "pie" },
    { key: "bar", text: <FM id="charts.bar" />, value: "bar" }
];

export const keyNameList = [
    { key: "birthYear", text: <FM id="charts.birthYear" />, value: "birthYear" },
    { key: "birthCountry", text: <FM id="profile.birthCountry" />, value: "birthCountry" },
    { key: "birthCounty", text: <FM id="profile.birthCounty" />, value: "birthCounty" },
    { key: "birthTown", text: <FM id="profile.birthTown" />, value: "birthTown" },
    { key: "diocese", text: <FM id="profile.diocese" />, value: "diocese" },
    { key: "deathYear", text: <FM id="charts.deathYear" />, value: "deathYear" },
    { key: "retirementYear", text: <FM id="charts.retirementYear" />, value: "retirementYear" },
    { key: "isMarried", text: <FM id="charts.isMarried" />, value: "isMarried" },
    { key: "isWidow", text: <FM id="charts.isWidow" />, value: "isWidow" },
    { key: "isDivorced", text: <FM id="charts.isDivorced" />, value: "isDivorced" },
    { key: "0", value: "0", disabled: true }, // these have no data from prod db, so are placed below a divider
    { key: "subscriptionYear", text: <FM id="charts.subscriptionYear" />, value: "subscriptionYear" },
    { key: "graduationYear", text: <FM id="charts.graduationYear" />, value: "graduationYear" },
    { key: "consecrationYear", text: <FM id="charts.consecrationYear" />, value: "consecrationYear" },
    { key: "resignedYear", text: <FM id="charts.resignedYear" />, value: "resignedYear" },
    { key: "firedYear", text: <FM id="charts.firedYear" />, value: "firedYear" },
    { key: "isChangedCareer", text: <FM id="charts.isChangedCareer" />, value: "isChangedCareer" }
];
export const dataNameList = [
    { key: "nr", text: <FM id="charts.nr" />, value: "nr" },
    { key: "nrChildren", text: <FM id="charts.nrChildren" />, value: "nrChildren" },
    { key: "nrSpouses", text: <FM id="charts.nrSpouses" />, value: "nrSpouses" },
    { key: "nrQualifications", text: <FM id="charts.nrQualifications" />, value: "nrQualifications" },
    { key: "nrMainPriestPlaces", text: <FM id="charts.nrMainPriestPlaces" />, value: "nrMainPriestPlaces" },
    { key: "nrAssistantPriestPlaces", text: <FM id="charts.nrAssistantPriestPlaces" />, value: "nrAssistantPriestPlaces" },
    { key: "nrAllPlacements", text: <FM id="charts.nrAllPlacements" />, value: "nrAllPlacements" },
    { key: "0", value: "0", disabled: true }, // these have no data from prod db, so are placed below a divider
    { key: "nrChurchOffices", text: <FM id="charts.nrChurchOffices" />, value: "nrChurchOffices", divider: "top" },
    { key: "nrOtherOffices", text: <FM id="charts.nrOtherOffices" />, value: "nrOtherOffices" },
    { key: "nrLiteraryWorks", text: <FM id="charts.nrLiteraryWorks" />, value: "nrLiteraryWorks" },
    { key: "nrPriestReferences", text: <FM id="charts.nrReferences" />, value: "nrPriestReferences" },
    { key: "nrDisciplinaryMatters", text: <FM id="charts.nrDisciplinaryMatters" />, value: "nrDisciplinaryMatters" },
    { key: "nrSuspensions", text: <FM id="charts.nrSuspensions" />, value: "nrSuspensions" }
];

export const axisNameList = [
    { key: "x", text: <FM id="charts.sortByX" />, value: "x" },
    { key: "y", text: <FM id="charts.sortByY" />, value: "y" }
];
