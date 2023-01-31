import React, { useState, useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { msalConfig } from "../../configs/authConfig";
import { AccountInfo } from "@azure/msal-browser";

const RouteGuard = (props) => {
    const { instance } = useMsal();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [message, setMessage] = useState("");
    const onLoad = async () => {
        const currentAccount = instance.getActiveAccount();
        if (currentAccount) {
            if (currentAccount.tenantId == msalConfig.auth.tenantId) {
                const idTokenClaims = currentAccount.idTokenClaims;
                if (
                    idTokenClaims &&
                    idTokenClaims.aud == msalConfig.auth.clientId &&
                    idTokenClaims["roles"]
                ) {
                    const intersection = props.roles.filter((role) =>
                        idTokenClaims["roles"].includes(role)
                    );
                    if (intersection.length > 0) {
                        setIsAuthorized(true);
                    } else {
                        setMessage(
                            "You don't have the required role to view this page. Please contact site administrator."
                        );
                    }
                } else {
                    setMessage(
                        "The application you authorized with cannot access this page. Please contact site administrator."
                    );
                }
            } else {
                setMessage(
                    "Your organization does not have access this content."
                );
            }
        }
    };
    useEffect(() => {
        onLoad();
    }); // removing [instance] argument to refresh component on every load
    return (
        <>
            <>
                {isAuthorized ? (
                    <Route
                        {...props}
                        render={(routeProps) => (
                            <React.Component {...routeProps} />
                        )}
                    />
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                        }}
                    >
                        <h4>{message}</h4>
                    </div>
                )}
            </>
        </>
    );
};
export default RouteGuard;
