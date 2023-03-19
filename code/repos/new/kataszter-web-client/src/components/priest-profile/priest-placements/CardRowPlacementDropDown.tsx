import React from "react";
import { Dropdown, Form, Loader, Message } from "semantic-ui-react";

import { FormattedMessage as FM, useIntl } from "react-intl";
import IParishMin from "../../../data/parish/ParishMin";
import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";

interface ICardRowPlacementDropDownProps {
    index: number;
    placeID: number;
    placeName: string;
    editMode: boolean;
    parishResponse: IParishMin[] | undefined;
    parishLoading: boolean;
    parishShowError: boolean;
    handlePlacementChange(placeID: number, place: string, index: number): any;
}

const CardRowPlacementDropDown: React.FC<ICardRowPlacementDropDownProps> = (props: ICardRowPlacementDropDownProps) => {
    const { placeID, placeName, editMode, handlePlacementChange, index, parishResponse, parishLoading, parishShowError } = props;
    const { formatMessage: fm } = useIntl();

    const options: any = [];

    const handleChange = (_: any, { value }: any) => {
        handlePlacementChange(options[value].key, options[value].text, index);
    };

    if (parishLoading) {
        return (
            <Form>
                <Form.Field inline>
                    <BoldFM id="profile.parish" showColon />{" "}
                    {editMode ? <Loader active inline /> : placeName ? placeName : <ItalicFM id="general.noData" />}
                </Form.Field>
            </Form>
        );
    } else if (parishShowError || !parishResponse || parishResponse.length === 0) {
        return (
            <Form>
                <Form.Field inline>
                    <BoldFM id="profile.parish" showColon />{" "}
                    {editMode ? (
                        <Message negative>
                            <FM id="error.connection" />
                        </Message>
                    ) : placeName ? (
                        placeName
                    ) : (
                        <ItalicFM id="general.noData" />
                    )}
                </Form.Field>
            </Form>
        );
    } else {
        parishResponse.forEach((resp, ndx) => {
            options.push({ key: resp.ID, text: resp.name, value: ndx });
        });

        const currOption = options.find((opt: any) => opt.key === placeID);
        const currValue = currOption ? currOption.value : null;

        return (
            <Form>
                <Form.Field inline>
                    <BoldFM id="profile.parish" showColon />{" "}
                    {editMode ? (
                        <Dropdown
                            options={options}
                            value={currValue}
                            onChange={handleChange}
                            placeholder={fm({ id: "search.select" })}
                            noResultsMessage={fm({ id: "search.noResultMini" })}
                            deburr
                            fluid
                            scrolling
                            search
                            selection
                        />
                    ) : placeName ? (
                        placeName
                    ) : (
                        <ItalicFM id="general.noData" />
                    )}
                </Form.Field>
            </Form>
        );
    }
};

export default CardRowPlacementDropDown;
