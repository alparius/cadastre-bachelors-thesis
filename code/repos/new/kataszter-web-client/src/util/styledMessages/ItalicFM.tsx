import React from "react";
import { FormattedMessage as FM } from "react-intl";

interface IItalicFMProps {
    id: string;
    showColon?: boolean;
    style?: React.CSSProperties;
}

const ItalicFM = (props: IItalicFMProps) => {
    const { id, showColon, style } = props;
    return (
        <FM id={id}>
            {(txt) => (
                <i style={style}>
                    {txt}
                    {showColon && ":"}
                </i>
            )}
        </FM>
    );
};

export default ItalicFM;
