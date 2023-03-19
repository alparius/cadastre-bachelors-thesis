interface IPriestChartData {
    birthYear: number;
    deathYear: number;
    subscriptionYear: number;
    graduationYear: number;
    consecrationYear: number;
    retirementYear: number;
    resignedYear: number;
    firedYear: number;
    birthCountry: string;
    birthCounty: string;
    birthTown: string;
    diocese: string;
    isMarried: boolean;
    isWidow: boolean;
    isDivorced: boolean;
    isChangedCareer: boolean;
    nrChildren: number;
    nrSpouses: number;
    nrQualifications: number;
    nrAssistantPriestPlaces: number;
    nrMainPriestPlaces: number;
    nrAllPlacements: number;
    nrChurchOffices: number;
    nrOtherOffices: number;
    nrLiteraryWorks: number;
    nrPriestReferences: number;
    nrDisciplinaryMatters: number;
    nrSuspensions: number;
    nr: 1;
    [key: string]: string | number | boolean;
}

export default IPriestChartData;
