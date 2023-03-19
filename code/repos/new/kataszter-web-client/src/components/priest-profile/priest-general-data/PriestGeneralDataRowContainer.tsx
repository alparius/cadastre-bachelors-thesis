import React from "react";
import { Form, Grid } from "semantic-ui-react";

import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";

interface IPriestGeneralDataRowContainerProps {
    labelName: string;
    dataName?: string;
    data: string;
    isGrey?: boolean;
    editMode: boolean;
    setPriest(labelName: string, value: any): any;
}

const PriestGeneralDataRowContainer: React.FC<IPriestGeneralDataRowContainerProps> = (props: IPriestGeneralDataRowContainerProps) => {
    const { labelName, dataName, data, editMode, isGrey, setPriest } = props;

    const handleChange = (event: any) => {
        dataName ? setPriest(dataName, event.target.value) : setPriest(labelName, event.target.value);
    };

    return (
        <Grid.Row id={isGrey ? "grey" : ""}>
            <Grid.Column className="text" align="center">
                <BoldFM id={"profile." + labelName} showColon />
            </Grid.Column>
            <Grid.Column name={labelName} className="text">
                {editMode ? (
                    <Form.Input id={isGrey ? "grey" : ""} value={data} onChange={handleChange} />
                ) : data ? (
                    data
                ) : (
                    <ItalicFM id="general.noData" />
                )}
            </Grid.Column>
        </Grid.Row>
    );
};

export default PriestGeneralDataRowContainer;
