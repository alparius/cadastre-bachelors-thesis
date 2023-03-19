import React from "react";
import { Card } from "semantic-ui-react";

import IParishGeneralData from "../../data/parish/ParishGeneralData";
import ItalicFM from "../../util/styledMessages/ItalicFM";
import PastNameCard from "./parish-general-data/PastNameCard";

interface IParishPastNameList2Props {
    parish: IParishGeneralData;
    editMode: boolean;
    setParish(newParish: IParishGeneralData): void;
}

const ParishPastNameList: React.FC<IParishPastNameList2Props> = (props: IParishPastNameList2Props) => {
    const { parish, editMode, setParish } = props;

    const handleDelete = (index: number) => {
        parish.pastNames.splice(index, 1);
        setParish({
            ...parish,
            pastNames: parish.pastNames
        });
    };

    const handleChangeOnPastName = (labelName: string, value: any, index: number) => {
        setParish({
            ...parish,
            pastNames: parish.pastNames.map((pastName, i) => (i === index ? { ...pastName, [labelName]: value } : { ...pastName }))
        });
    };

    if (!parish.pastNames || parish.pastNames.length === 0) {
        return <ItalicFM id="general.noData" />;
    } else {
        return (
            <Card.Group stackable itemsPerRow={1}>
                {parish.pastNames.map((_, index: number) => (
                    <PastNameCard
                        key={index}
                        pastName={parish.pastNames[index]}
                        index={index}
                        editMode={editMode}
                        handleDelete={handleDelete}
                        handleChangeOnPastName={handleChangeOnPastName}
                    />
                ))}
            </Card.Group>
        );
    }
};

export default ParishPastNameList;
