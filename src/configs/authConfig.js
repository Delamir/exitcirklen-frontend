/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        tenantId: "0a3f5dba-63f4-4ed4-9326-10861b5c37ce",
        clientId: "0eeec535-23e9-4ba4-a337-886b0fc837fe", // This is the ONLY mandatory field that you need to supply.
        authority:
            "https://login.microsoftonline.com/0a3f5dba-63f4-4ed4-9326-10861b5c37ce", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "http://localhost:3000/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};

export const protectedResources = {
    api: {
        endpoint: "http://localhost:8081",
        scopes: {
            admin: [
                "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.admin",
                "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Visitation",
                "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Groups",
            ],
            visitation: [
                "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Visitation",
            ],
            group: [
                "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Groups",
            ],
        },
    },
};

export const appRoles = {
    admin: "admin",
    visitator: "visitation",
    group: "groups",
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [
        "openid",
        "profile",
        "email",
        "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.admin",
        "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Visitation",
        "api://f24f0ab0-fcc8-4f1a-b851-27e6eccb9029/apiScope.Groups",
        "User.Read",
    ],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
    scopes: ["openid", "profile"],
    loginHint: "example@domain.net",
};
