import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Button, Grid } from "semantic-ui-react";

interface IEditModeControlLabelButtonsProps {
    text: string;
    onSave(): any;
    onRevertChanges(): any;
}

const EditModeControlLabelButtons: React.FC<IEditModeControlLabelButtonsProps> = (props: IEditModeControlLabelButtonsProps) => {
    const { text, onSave, onRevertChanges } = props;

    return (
        <Grid columns={2} stackable>
            <Grid.Column verticalAlign="middle" id="editModeText">
                <FM id={text} />
            </Grid.Column>
            <Grid.Column>
                <Grid columns={2}>
                    <Grid.Column>
                        <Button id="saveChanges" color="violet" fluid onClick={onSave}>
                            <FM id="profile.editModeSaveChanges" />
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button id="revertChanges" color="grey" fluid onClick={onRevertChanges} value={false}>
                            <FM id="profile.editModeCancel" />
                        </Button>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid>
    );
};

export default EditModeControlLabelButtons;
