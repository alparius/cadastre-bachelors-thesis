import React from "react";
import { Flag } from "semantic-ui-react";

import ILanguageConfig from "./ILanguageConfig.jsx";
import en_messages from "./locales/en/translations.json";
import hu_messages from "./locales/hu/translations.json";

const allLanguagesConfig: ILanguageConfig[] = [
    {
        key: "en",
        locale: "en",
        messages: en_messages,
        text: <Flag name="gb" />,
        value: "en"
    },
    {
        key: "hu",
        locale: "hu",
        messages: hu_messages,
        text: <Flag name="hu" />,
        value: "hu"
    }
];

export default allLanguagesConfig;
