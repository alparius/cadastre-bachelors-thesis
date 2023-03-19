import React from "react";
import { Responsive, Segment } from "semantic-ui-react";

import "../static/priestProfile.css";
import EditModeControlLabelButtons from "./EditModeControlLabelButtons";

interface IEditModeControlLabelProps {
    text: string;
    onSave(): any;
    onRevertChanges(): any;
}

const EditModeControlLabel: React.FC<IEditModeControlLabelProps> = (props: IEditModeControlLabelProps) => {
    const { text, onSave, onRevertChanges } = props;

    return (
        <>
            {/* Computer view */}
            <Responsive as={Segment} minWidth={769} tertiary id="editControlLabelComputer">
                <EditModeControlLabelButtons text={text} onSave={onSave} onRevertChanges={onRevertChanges} />
            </Responsive>

            {/* Mobile view */}
            <Responsive as={Segment} maxWidth={768} tertiary id="editControlLabelMobile">
                <EditModeControlLabelButtons text={text} onSave={onSave} onRevertChanges={onRevertChanges} />
            </Responsive>
        </>
    );
};

export default EditModeControlLabel;
