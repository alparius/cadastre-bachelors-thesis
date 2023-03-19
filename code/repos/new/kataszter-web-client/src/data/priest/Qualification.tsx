import IDate, { NewDate } from "../Date";

interface IQualification {
    diplomaName: string;
    genesisDate: IDate;
    issuingAuthority: string;
}

export let NewQualification: IQualification = {
    diplomaName: "",
    genesisDate: NewDate,
    issuingAuthority: ""
};

export default IQualification;
