import React from "react";
import { Grid } from "semantic-ui-react";

import IDate from "../../../data/Date";
import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import DateDisplay from "../../DateDisplay";
import DateInput from "../../DateInput";

interface IPriestGeneralDataRowContainerForDateProps {
    labelName: string;
    dataName?: string;
    data: IDate;
    isGrey?: boolean;
    editMode: boolean;
    setPriest(labelName: string, value: any): any;
}

const PriestGeneralDataRowContainerForDate: React.FC<IPriestGeneralDataRowContainerForDateProps> = (
    props: IPriestGeneralDataRowContainerForDateProps
) => {
    const { labelName, dataName, data, editMode, isGrey, setPriest } = props;

    const handleChange = (newDate: IDate) => {
        dataName ? setPriest(dataName, newDate) : setPriest(labelName, newDate);
    };

    return (
        <Grid.Row id={isGrey ? "grey" : ""}>
            <Grid.Column className="text" align="center">
                <BoldFM id={"profile." + labelName} showColon />
            </Grid.Column>
            <Grid.Column name={labelName} className="text">
                {editMode ? <DateInput date={data} changeDate={handleChange} isGrey={isGrey} /> : <DateDisplay date={data} />}
            </Grid.Column>
        </Grid.Row>
    );
};

export default PriestGeneralDataRowContainerForDate;
