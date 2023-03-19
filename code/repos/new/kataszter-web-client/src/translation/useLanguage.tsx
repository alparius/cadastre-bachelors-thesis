import React, { useEffect, useState } from "react";

import allLanguagesConfig from "./allLanguagesConfig";
import ILanguageConfig from "./ILanguageConfig";

const useLanguage = (): { languageConfig: ILanguageConfig; handleLanguageChange: (_: React.SyntheticEvent<HTMLElement>, { value }: any) => void } => {
    const [languageKey, setLanguageKey] = useState(localStorage.getItem("languageKey") || allLanguagesConfig[1].key);

    useEffect(() => {
        localStorage.setItem("languageKey", languageKey);
    }, [languageKey]);

    const handleLanguageChange = (_: React.SyntheticEvent<HTMLElement>, { value }: any) => {
        setLanguageKey(value);
    };

    const languageConfig = allLanguagesConfig.filter((c: ILanguageConfig) => c.locale === languageKey)[0];

    return { languageConfig, handleLanguageChange };
};

export default useLanguage;
