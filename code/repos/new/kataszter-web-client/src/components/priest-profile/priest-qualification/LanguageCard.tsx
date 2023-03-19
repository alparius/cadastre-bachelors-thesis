import React from "react";
import { FormattedMessage as FM } from "react-intl";
import { Card, Form, Header, Input, List } from "semantic-ui-react";

import ILanguageSkills from "../../../data/priest/LanguageSkills";
import "../../../static/priestProfile.css";
import BoldFM from "../../../util/styledMessages/BoldFM";
import ItalicFM from "../../../util/styledMessages/ItalicFM";

interface ILanguageCardProps {
    languageSkills: ILanguageSkills;
    editMode: boolean;
    label: string;
    handleChangeOnLanguageSkills: (labelName: string, value: any) => void;
}

const LanguageCard: React.FC<ILanguageCardProps> = (props: ILanguageCardProps) => {
    const { languageSkills, editMode, handleChangeOnLanguageSkills, label } = props;

    const handleChange = (_: any, { name, value }: any) => {
        handleChangeOnLanguageSkills(label, { ...languageSkills, [name]: value });
    };
    return (
        <Card fluid>
            <Card.Content>
                <Card.Content>
                    <Card.Header id="header">
                        <Header as="h2">
                            <FM id={"profile." + label} />
                        </Header>
                    </Card.Header>
                </Card.Content>

                <Card.Description>
                    {!languageSkills.well && !languageSkills.medium && !languageSkills.less && !editMode && <ItalicFM id="general.noData" />}
                    <List>
                        {(languageSkills.well || editMode) && (
                            <List.Item>
                                <Form>
                                    <Form.Field inline>
                                        <BoldFM id={"profile.well"} showColon />{" "}
                                        {editMode ? (
                                            <Input size="small" value={languageSkills.well} name="well" onChange={handleChange} fluid />
                                        ) : (
                                            languageSkills.well
                                        )}
                                    </Form.Field>
                                </Form>
                            </List.Item>
                        )}
                        {(languageSkills.medium || editMode) && (
                            <List.Item>
                                <Form>
                                    <Form.Field inline>
                                        <BoldFM id={"profile.medium"} showColon />{" "}
                                        {editMode ? (
                                            <Input size="small" value={languageSkills.medium} name="medium" onChange={handleChange} fluid />
                                        ) : (
                                            languageSkills.medium
                                        )}
                                    </Form.Field>
                                </Form>
                            </List.Item>
                        )}
                        {(languageSkills.less || editMode) && (
                            <List.Item>
                                <Form>
                                    <Form.Field inline>
                                        <BoldFM id={"profile.less"} showColon />{" "}
                                        {editMode ? (
                                            <Input size="small" value={languageSkills.less} name="less" onChange={handleChange} fluid />
                                        ) : (
                                            languageSkills.less
                                        )}
                                    </Form.Field>
                                </Form>
                            </List.Item>
                        )}
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default LanguageCard;
