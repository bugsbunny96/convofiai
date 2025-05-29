import { App } from "realm-web";

const app = new App({
    id: "convofi-agents-zzqcxbo",
});

export interface TeamMemberUser {
    name: string;
    mail: string;
    mobile?: string;
}

export interface TeamMemberCreateArgs {
    team: string;
    user: TeamMemberUser;
    role: string;
}

export const TeamMemberCreate = async ({ team, user, role }: TeamMemberCreateArgs): Promise<any> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_REALM_API_KEY || "i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
        const credentials = App.Credentials.apiKey(apiKey);
        const realmUser = await app.logIn(credentials);

        const datx = {
            data: {
                team, // team ID
                user, // { name, mail, mobile }
                role, // e.g. 'admin', 'viewer', etc.
            },
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
        };

        const args = [{ body: JSON.stringify(datx) }];
        const result = await realmUser.functions["team_member_create"](...args);
        return result;
    } catch (error) {
        console.error("Failed to call team_member_create:", error);
        throw error;
    }
};

export const TeamMemberList = async (team: string): Promise<any> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_REALM_API_KEY || "i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
        const credentials = App.Credentials.apiKey(apiKey);
        const realmUser = await app.logIn(credentials);

        const datx = {
            data: { team },
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
        };
        const args = [{ body: JSON.stringify(datx) }];
        const result = await realmUser.functions["team_member_list"](...args);
        return result;
    } catch (error) {
        console.error("Failed to call team_member_list:", error);
        throw error;
    }
};