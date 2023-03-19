import { MessageFormatElement } from "intl-messageformat-parser";

interface ILanguageConfig {
    key: string;
    locale: string;
    messages: Record<string, string> | Record<string, MessageFormatElement[]> | undefined;
    text: any;
    value: string;
}

export default ILanguageConfig;
