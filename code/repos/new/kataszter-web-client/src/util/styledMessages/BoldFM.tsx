import React from "react";
import { FormattedMessage as FM } from "react-intl";

interface IBoldFMProps {
    id: string;
    showColon?: boolean;
    style?: React.CSSProperties;
}

const BoldFM = (props: IBoldFMProps) => {
    const { id, showColon, style } = props;
    return (
        <FM id={id}>
            {(txt) => (
                <b style={style}>
                    {txt}
                    {showColon && ":"}
                </b>
            )}
        </FM>
    );
};

export default BoldFM;
