import { App } from "realm-web";

const app = new App({
    id: "convofi-rooms-rqniqih",
});



export interface ChatRoomListArgs {
    user: string;

}

export interface AddMessageToRoomArgs {
    data: object;

}

export const ChatRoomList = async ({ user }: ChatRoomListArgs): Promise<any> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_REALM_API_KEY || "gXih3Dw5G9vNvQOkEgb1zGEr55vE9VVpRs9uBHy68f85Z2RqF6VSYZNuZCxVQljv";
        const credentials = App.Credentials.apiKey(apiKey);
        const realmUser = await app.logIn(credentials);

        const datx = {
            data: {
                user,
            },
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
        };

        const args = [{ body: JSON.stringify(datx) }];
        const result = await realmUser.functions["My_Rooms_Lists"](...args);
        return result;
    } catch (error) {
        console.error("Failed to call team_member_create:", error);
        throw error;
    }
};


export const AddMessageToRoom = async ({ data }: AddMessageToRoomArgs): Promise<any> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_REALM_API_KEY || "gXih3Dw5G9vNvQOkEgb1zGEr55vE9VVpRs9uBHy68f85Z2RqF6VSYZNuZCxVQljv";
        const credentials = App.Credentials.apiKey(apiKey);
        const realmUser = await app.logIn(credentials);

        const datx = {
            data,
            srvc: "988b9aee-f02a-411c-957d-02ef420586a2"
        };

        const args = [{ body: JSON.stringify(datx) }];
        const result = await realmUser.functions["Add_Message"](...args);
        return result;
    } catch (error) {
        console.error("Failed to call team_member_create:", error);
        throw error;
    }
};