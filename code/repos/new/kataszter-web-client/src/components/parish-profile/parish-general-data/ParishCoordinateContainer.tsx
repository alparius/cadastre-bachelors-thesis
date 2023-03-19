import React from "react";
import { Container, Form } from "semantic-ui-react";

import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";

interface IParishCoordinateContainerProps {
    labelName: string;
    data: number;
    editMode: boolean;
    setParish(labelName: string, value: any): any;
}

const ParishCoordinateContainer: React.FC<IParishCoordinateContainerProps> = (props: IParishCoordinateContainerProps) => {
    const { labelName, data, editMode, setParish } = props;

    const handleChange = (event: any) => {
        setParish(labelName, event.target.value);
    };

    return (
        <Container style={{ marginBottom: "0.75em" }} fluid>
            <BoldFM id={"parish.coordinates." + labelName} showColon />{" "}
            {editMode ? (
                <Form.Input type="number" value={data} onChange={handleChange} />
            ) : data !== undefined ? (
                data
            ) : (
                <ItalicFM id="general.noData" />
            )}
        </Container>
    );
};

export default ParishCoordinateContainer;
