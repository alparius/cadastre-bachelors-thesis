import IDate, { NewDate } from "../Date";
import IChangedCareer, { NewChangedCareer } from "./ChangedCareer";
import IChild, { NewChild } from "./Child";
import IConsecration, { NewConsecration } from "./Consecration";
import IDisciplinaryMatter, { NewDisciplinaryMatter } from "./DisciplinaryMatter";
import ILanguageSkills, { NewLanguageSkills } from "./LanguageSkills";
import ILiteraryWork, { NewLiteraryWork } from "./LiteraryWork";
import IMainPlacement, { NewMainPlacement } from "./MainPlacement";
import IOffice, { NewOffice } from "./Office";
import IParent, { NewParent } from "./Parent";
import IPlacement, { NewPlacement } from "./Placement";
import IPriestReference, { NewPriestReference } from "./PriestReference";
import IQualification, { NewQualification } from "./Qualification";
import ISpouse, { NewSpouse } from "./Spouse";
import ISuspension, { NewSuspension } from "./Suspension";

interface IPriestProfileData {
    ID: number;
    name: string;
    verified: boolean;
    birthDate: IDate;
    deathDate: IDate;
    subscriptionDate: IDate;
    graduationDate: IDate;
    birthCountry: string;
    birthCounty: string;
    birthTown: string;
    diocese: string;
    isMarried: boolean;
    isWidow: boolean;
    isDivorced: boolean;
    father: IParent;
    mother: IParent;
    retirementDate: IDate;
    children: IChild[];
    spouses: ISpouse[];
    qualifications: IQualification[];
    assistantPriestPlaces: IPlacement[];
    mainPriestPlaces: IMainPlacement[];
    speakingSkills: ILanguageSkills;
    writingSkills: ILanguageSkills;
    pictures: string[];
    files: string[];
    army: string;
    resigned: IDate;
    fired: IDate;
    note: string;
    consecration: IConsecration;
    churchOffices: IOffice[];
    otherOffices: IOffice[];
    literaryWorks: ILiteraryWork[];
    priestReferences: IPriestReference[];
    disciplinaryMatters: IDisciplinaryMatter[];
    suspensions: ISuspension[];
    changedCareer: IChangedCareer;
}

export let NewPriestProfileData: IPriestProfileData = {
    ID: 0,
    name: "",
    verified: false,
    birthDate: NewDate,
    deathDate: NewDate,
    subscriptionDate: NewDate,
    graduationDate: NewDate,
    birthCountry: "",
    birthCounty: "",
    birthTown: "",
    diocese: "",
    isMarried: false,
    isWidow: false,
    isDivorced: false,
    father: NewParent,
    mother: NewParent,
    retirementDate: NewDate,
    children: [NewChild],
    spouses: [NewSpouse],
    qualifications: [NewQualification],
    assistantPriestPlaces: [NewPlacement],
    mainPriestPlaces: [NewMainPlacement],
    speakingSkills: NewLanguageSkills,
    writingSkills: NewLanguageSkills,
    pictures: [],
    files: [],
    army: "",
    resigned: NewDate,
    fired: NewDate,
    note: "",
    consecration: NewConsecration,
    churchOffices: [NewOffice],
    otherOffices: [NewOffice],
    literaryWorks: [NewLiteraryWork],
    priestReferences: [NewPriestReference],
    disciplinaryMatters: [NewDisciplinaryMatter],
    suspensions: [NewSuspension],
    changedCareer: NewChangedCareer
};

export default IPriestProfileData;
