import ICoordinates from "../../../data/Coordinates";
import IDate from "../../../data/Date";
import UserRole from "../../../data/enums/UserRole";
import IParishMin from "../../../data/parish/ParishMin";
import IParishPlacement from "../../../data/parish/ParishPlacement";
import IChangedCareer from "../../../data/priest/ChangedCareer";
import IChild from "../../../data/priest/Child";
import IConsecration from "../../../data/priest/Consecration";
import ICreatePriestData from "../../../data/priest/CreatePriestData";
import IDisciplinaryMatter from "../../../data/priest/DisciplinaryMatter";
import ILanguageSkills from "../../../data/priest/LanguageSkills";
import ILiteraryWork from "../../../data/priest/LiteraryWork";
import IMainPlacement from "../../../data/priest/MainPlacement";
import IOffice from "../../../data/priest/Office";
import IParent from "../../../data/priest/Parent";
import IPlacement from "../../../data/priest/Placement";
import IPriestFilters from "../../../data/priest/PriestFilters";
import IPriestMin from "../../../data/priest/PriestMin";
import IPriestProfileData from "../../../data/priest/PriestProfileData";
import IPriestReference from "../../../data/priest/PriestReference";
import IQualification from "../../../data/priest/Qualification";
import ISpouse from "../../../data/priest/Spouse";
import ISuspension from "../../../data/priest/Suspension";
import ILoginUserData from "../../../data/user/LoginUserData";
import IRegisterUserData from "../../../data/user/RegisterUserData";
import IUser from "../../../data/user/User";
import IUserUnderDecisionData from "../../../data/user/UserUnderDecisionData";
import ICreatePriestResponse from "../../../requests/response/CreatePriestResponse";
import ILabelResponse from "../../../requests/response/LabelResponse";

export let NewTestDate: IDate = {
    year: 2000,
    month: 6,
    day: 6,
    comment: "2000.06.06"
};

export let NewTestPlacement: IPlacement = {
    ID: 0,
    placeID: 0,
    place: "place",
    startDate: NewTestDate,
    endDate: NewTestDate
};

export let NewTestMainPlacement: IMainPlacement = {
    ID: 0,
    placeID: 0,
    place: "place",
    startDate: NewTestDate,
    endDate: NewTestDate,
    munimentGenesisDate: NewTestDate,
    munimentNumber: "munimentNumber",
    munimentIssuingAuthority: "munimentIssuingAuthority",
    income: "income",
    numberOfPeople: "numberOfPeople"
};

export let NewTestParishPlacement: IParishPlacement = {
    ID: 0,
    priestID: 22222222222,
    priestName: "Janos",
    startDate: NewTestDate,
    endDate: NewTestDate,
    numberOfPeople: "12"
};

export let NewTestPriestMin: IPriestMin = {
    ID: 1,
    name: "name",
    verified: false,
    birthDate: NewTestDate,
    deathDate: NewTestDate,
    subscriptionDate: NewTestDate,
    graduationDate: NewTestDate,
    birthTown: "birthTown",
    birthCountry: "birthCountry",
    birthCounty: "birthCounty",
    diocese: "diocese",
    assistantPriestPlaces: [NewTestPlacement],
    mainPriestPlaces: [NewTestPlacement]
};

export let NewTestChild: IChild = {
    name: "Gyerek",
    birthPlace: "Krahorandia",
    birthDate: NewTestDate
};

export let NewTestSpouse: ISpouse = {
    name: "Házastárs",
    birthDate: NewTestDate,
    job: "Szavazati joggal rendelkező",
    marriageDate: NewTestDate,
    fatherName: "Lajos",
    motherName: "Laci"
};

export let NewTestQualification: IQualification = {
    diplomaName: "Erettsegi bizonyitvany",
    genesisDate: NewTestDate,
    issuingAuthority: "Felso Oktatasi Intezmeny"
};

export let NewTestSpeakingSkills: ILanguageSkills = {
    well: "magyar",
    medium: "román",
    less: "német"
};

export let NewTestWritingSkills: ILanguageSkills = {
    well: "magyar",
    medium: "román",
    less: "német"
};

export let NewTestParent: IParent = {
    name: "Pataki Miklos",
    job: "Kutyaház tetőfedő",
    birthDate: NewTestDate,
    deathDate: NewTestDate
};

export let NewTestConsecration: IConsecration = {
    place: "tesztplace",
    date: NewTestDate
};

export let NewTestOffice: IOffice = {
    name: "tesztofficename",
    startDate: NewTestDate,
    endDate: NewTestDate,
    comment: "tesztcomment"
};

export let NewTestLiteraryWork: ILiteraryWork = {
    title: "teszttitle",
    published: NewTestDate,
    publisher: "tesztpublisher"
};

export let NewTestPriestReference: IPriestReference = {
    place: "tesztplace",
    date: NewTestDate
};

export let NewTestDisciplinaryMatter: IDisciplinaryMatter = {
    name: "tesztname",
    issuingAuthority: "tesztaut"
};

export let NewTestSuspension: ISuspension = {
    startDate: NewTestDate,
    endDate: NewTestDate,
    punishment: "tesztpunishment"
};

export let NewTestChangedCareer: IChangedCareer = {
    name: "tesztname",
    date: NewTestDate
};

export let NewTestPriestProfileData: IPriestProfileData = {
    ID: 2,
    name: "Janos",
    verified: false,
    birthDate: NewTestDate,
    deathDate: NewTestDate,
    subscriptionDate: NewTestDate,
    graduationDate: NewTestDate,
    birthCountry: "Románia",
    birthCounty: "Erdély",
    birthTown: "Zilah",
    diocese: "Zilahi",
    consecration: NewTestConsecration,
    isMarried: true,
    isWidow: false,
    isDivorced: false,
    father: NewTestParent,
    mother: NewTestParent,
    retirementDate: NewTestDate,
    children: [NewTestChild],
    spouses: [NewTestSpouse],
    qualifications: [NewTestQualification],
    mainPriestPlaces: [NewTestMainPlacement],
    assistantPriestPlaces: [NewTestPlacement],
    speakingSkills: NewTestSpeakingSkills,
    writingSkills: NewTestWritingSkills,
    pictures: [],
    files: [],
    army: "",
    resigned: NewTestDate,
    fired: NewTestDate,
    note: "",
    churchOffices: [NewTestOffice],
    otherOffices: [NewTestOffice],
    literaryWorks: [NewTestLiteraryWork],
    priestReferences: [NewTestPriestReference],
    disciplinaryMatters: [NewTestDisciplinaryMatter],
    suspensions: [NewTestSuspension],
    changedCareer: NewTestChangedCareer
};

export let NewTestUser: IUser = {
    ID: 0,
    name: "test",
    email: "test",
    role: UserRole.GUEST
};

export let NewTestRegisterUserData: IRegisterUserData = {
    name: "test",
    email: "test",
    password: "test",
    password2: "test",
    message: "test",
    recaptchaToken: ""
};

export let NewTestLoginUserData: ILoginUserData = {
    email: "",
    password: "",
    recaptchaToken: ""
};

export let NewTestPriestFilters: IPriestFilters = {
    name: "test",
    birthTown: "test",
    placement: "test",
    area: "test",
    activeStart: "test",
    activeEnd: "test",
    birthStart: "test",
    birthEnd: "test",
    deathStart: "test",
    deathEnd: "test",
    subscriptionStart: "test",
    subscriptionEnd: "test",
    graduationStart: "test",
    graduationEnd: "test"
};

export let NewTestCreatePriestData: ICreatePriestData = {
    name: "test",
    birthDate: NewTestDate,
    birthCountry: "test",
    birthCounty: "test",
    birthTown: "test",
    diocese: "test"
};

export let NewTestLabelResponseInfo: ILabelResponse = {
    label: "info.test"
};

export let NewTestLabelResponseError: ILabelResponse = {
    label: "error.test"
};

export let NewTestCreateResponse: ICreatePriestResponse = {
    data: NewTestPriestMin,
    label: "info.test",
    insertedID: 0
};

export let NewTestUserUnderDecisionData: IUserUnderDecisionData = {
    ID: 0,
    message: "test",
    role: UserRole.PENDING
};

export let NewTestCoordinates: ICoordinates = {
    lat: 0,
    lng: 0
};

export let NewTestParishMin: IParishMin = {
    ID: 1,
    name: "name",
    verified: true,
    numberOfPriests: "12",
    cityName: "Test city",
    coordinates: NewTestCoordinates
};
