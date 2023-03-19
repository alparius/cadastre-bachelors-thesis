interface IParishFilters {
    parishName: string;
    cityName: string;
    minSize: string;
}

export let NewParishFilters: IParishFilters = {
    parishName: "",
    cityName: "",
    minSize: ""
};

export default IParishFilters;
