import React from "react";
import { Container, Form } from "semantic-ui-react";

import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";

interface IParishGeneralDataRowContainerProps {
    labelName: string;
    data: string;
    editMode: boolean;
    setParish(labelName: string, value: any): any;
}

const ParishGeneralDataRowContainer: React.FC<IParishGeneralDataRowContainerProps> = (props: IParishGeneralDataRowContainerProps) => {
    const { labelName, data, editMode, setParish } = props;

    const handleChange = (event: any) => {
        setParish(labelName, event.target.value);
    };

    return (
        <Container style={{ marginBottom: "1.5em" }} fluid>
            <BoldFM id={"parish." + labelName} showColon />{" "}
            {editMode ? <Form.Input value={data} onChange={handleChange} fluid /> : data ? data : <ItalicFM id="general.noData" />}
        </Container>
    );
};

export default ParishGeneralDataRowContainer;
