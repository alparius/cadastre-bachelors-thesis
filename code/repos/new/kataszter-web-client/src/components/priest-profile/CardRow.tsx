import React from "react";
import { Form, Input } from "semantic-ui-react";

import { isNumber } from "util";
import "../../static/priestProfile.css";
import BoldFM from "../../util/styledMessages/BoldFM";
import ItalicFM from "../../util/styledMessages/ItalicFM";

interface ICardRowProps {
    labelName: string;
    dataName?: string;
    index?: number;
    data: string;
    editMode: boolean;
    setValue(labelName: string, value: any, index?: number): any;
}

const CardRow: React.FC<ICardRowProps> = (props: ICardRowProps) => {
    const { labelName, dataName, data, editMode, setValue, index } = props;

    const handleChange = (event: any) => {
        if (dataName) {
            if (isNumber(index)) {
                setValue(dataName, event.target.value, index);
            } else {
                setValue(dataName, event.target.value);
            }
        } else {
            if (isNumber(index)) {
                setValue(labelName, event.target.value, index);
            } else {
                setValue(labelName, event.target.value);
            }
        }
    };

    return (
        <Form>
            <Form.Field inline>
                <BoldFM id={"profile." + labelName} showColon />{" "}
                {editMode ? <Input size="small" value={data} onChange={handleChange} fluid /> : data ? data : <ItalicFM id="general.noData" />}
            </Form.Field>
        </Form>
    );
};

export default CardRow;
