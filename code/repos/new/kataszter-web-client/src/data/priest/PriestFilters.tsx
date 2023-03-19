interface IPriestFilters {
    name: string;
    birthTown: string;
    placement: string;
    area: string;
    activeStart: string;
    activeEnd: string;
    birthStart: string;
    birthEnd: string;
    deathStart: string;
    deathEnd: string;
    subscriptionStart: string;
    subscriptionEnd: string;
    graduationStart: string;
    graduationEnd: string;
}

export let NewPriestFilters: IPriestFilters = {
    name: "",
    birthTown: "",
    placement: "",
    area: "",
    activeStart: "",
    activeEnd: "",
    birthStart: "",
    birthEnd: "",
    deathStart: "",
    deathEnd: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    graduationStart: "",
    graduationEnd: ""
};

export const filterStartYear = 1800;
export const filterEndYear = Number(new Date().getFullYear());

export default IPriestFilters;
