import ICoordinates, { NewCoordinates } from "../Coordinates";

interface IParishMin {
    ID: number;
    name: string;
    verified: boolean;
    numberOfPriests: string;
    cityName: string;
    coordinates: ICoordinates;
}

export let NewParishMin: IParishMin = {
    ID: 0,
    name: "",
    verified: true,
    numberOfPriests: "",
    cityName: "",
    coordinates: NewCoordinates
};

export default IParishMin;
