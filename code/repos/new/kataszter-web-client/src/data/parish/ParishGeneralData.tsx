import ICoordinates, { NewCoordinates } from "../Coordinates";
import IParishPastName, { NewParishPastName } from "./ParishPastName";
import IParishPlacement, { NewParishPlacement } from "./ParishPlacement";

interface IParishGeneralData {
    ID: number;
    name: string;
    cityName: string;
    verified: boolean;
    description: string;
    history: string;
    pastNames: IParishPastName[];
    coordinates: ICoordinates;
    assistantPriests: IParishPlacement[];
    mainPriests: IParishPlacement[];
    pictures: string[];
    files: string[];
}

export let NewParishGeneralData: IParishGeneralData = {
    ID: 0,
    name: "",
    cityName: "",
    verified: false,
    description: "",
    history: "",
    pastNames: [NewParishPastName],
    coordinates: NewCoordinates,
    assistantPriests: [NewParishPlacement],
    mainPriests: [NewParishPlacement],
    pictures: [],
    files: []
};

export default IParishGeneralData;
