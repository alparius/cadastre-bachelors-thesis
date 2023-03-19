import IParishMin from "../../data/parish/ParishMin";

interface ICreateParishResponse {
    label: string;
    insertedID: number;
    data: IParishMin;
}

export default ICreateParishResponse;
