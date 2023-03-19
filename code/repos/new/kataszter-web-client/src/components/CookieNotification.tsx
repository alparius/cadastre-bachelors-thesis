import React from "react";
import CookieConsent from "react-cookie-consent";
import { useIntl } from "react-intl";

const CookieNotification: React.FC = () => {
    const { formatMessage: fm } = useIntl();

    return (
        <CookieConsent
            location="bottom"
            buttonText={fm({ id: "home.cookie.hide" })}
            style={{ background: "rgb(230,230,230)", color: "black", fontSize: "14px" }}
            buttonStyle={{ background: "#6435c9", color: "white", fontSize: "14px", borderRadius: "4px" }}
            expires={150}
        >
            {fm({ id: "home.cookie.mainText" })} <span style={{ fontSize: "11px" }}>{fm({ id: "home.cookie.subText" })}</span>
        </CookieConsent>
    );
};
export default CookieNotification;
