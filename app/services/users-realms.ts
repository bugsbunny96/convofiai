import { App } from "realm-web";
import { UserAccount, UserAccountListResponse, UserAccountCreateResponse } from "../types/user";

const app = new App({
    id: "convofi-users-zzqcxbo",
});

const API_KEY = process.env.NEXT_PUBLIC_REALM_API_KEY || "i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
const SERVICE_ID = "988b9aee-f02a-411c-957d-02ef420586a2";

export interface UserAccountData {
    body: {
        data: {
            name?: string;
            mail?: string;
            mobile?: string;
            user?: string;
            srvc?: string;
        };
        srvc?: string;
    };
}

class RealmServiceError extends Error {
    constructor(message: string, public code?: string) {
        super(message);
        this.name = 'RealmServiceError';
    }
}

const handleRealmError = (error: unknown): never => {
    console.error("Realm service error:", error);
    if (error instanceof Error) {
        throw new RealmServiceError(error.message);
    }
    throw new RealmServiceError("An unknown error occurred");
};

const getRealmUser = async () => {
    try {
        const credentials = App.Credentials.apiKey(API_KEY);
        const user = await app.logIn(credentials);
        if (!user) {
            throw new RealmServiceError("Failed to authenticate with Realm");
        }
        return user;
    } catch (error) {
        return handleRealmError(error);
    }
};

export const UserAccountCreate = async (item: UserAccountData): Promise<UserAccountCreateResponse> => {
    try {
        const user = await getRealmUser();
        if (!user) {
            throw new RealmServiceError("Failed to authenticate with Realm");
        }

        const datx = { 
            data: item.body.data, 
            srvc: SERVICE_ID 
        };
        
        const args = [{
            body: JSON.stringify(datx),
        }];

        const result = await user.functions["user_account_create"](...args);
        
        if (!result.stat) {
            throw new RealmServiceError(result.memo || "Account creation failed");
        }

        return result;
    } catch (error) {
        return handleRealmError(error);
    }
};

export const UserAccountList = async (item: UserAccountData): Promise<UserAccountListResponse> => {
    try {
        const user = await getRealmUser();
        if (!user) {
            throw new RealmServiceError("Failed to authenticate with Realm");
        }

        const datx = { 
            data: item.body.data, 
            srvc: SERVICE_ID 
        };
        
        const args = [{
            body: JSON.stringify(datx),
        }];

        const result = await user.functions["user_account_list"](...args);
        
        if (!result.stat) {
            throw new RealmServiceError(result.memo || "Failed to fetch user accounts");
        }

        return result;
    } catch (error) {
        return handleRealmError(error);
    }
};