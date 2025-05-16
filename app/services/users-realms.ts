import { App } from "realm-web";

const app = new App({
    id: "convofi-users-zzqcxbo",
});

interface UserAccountData {
    body: {
        data: {
            email?: string;
            name?: string;
            password?: string;
            [key: string]: unknown;
        };
    };
}

interface ApiResponse {
    stat: boolean;
    data: unknown;
}

export const UserAccountCreate = async (item: UserAccountData): Promise<ApiResponse> => {
    try {
      const apiKey = "i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
      const credentials = App.Credentials.apiKey(apiKey);
      const user = await app.logIn(credentials);
  
      const datx = { data: item.body.data, srvc: "988b9aee-f02a-411c-957d-02ef420586a2" };
     
      const args = [
        {
          body: JSON.stringify(datx),
        },
      ];
  
      const result = await user.functions["user_account_create"](...args);
      const data = result.stat ? result.data : result.data;
      return { ...result, data };
    } catch (error) {
      console.error("Failed to call MongoDB function:", error);
      throw error;
    }
};

export const UserAccountList = async (item: UserAccountData): Promise<ApiResponse> => {
    try {
      const apiKey = "i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
      const credentials = App.Credentials.apiKey(apiKey);
      const user = await app.logIn(credentials);
  
      const datx = { data: item.body.data, srvc: "988b9aee-f02a-411c-957d-02ef420586a2" };
     
      const args = [
        {
          body: JSON.stringify(datx),
        },
      ];
  
      const result = await user.functions["user_account_list"](...args);
      const data = result.stat ? result.data : result.data;
      return { ...result, data };
    } catch (error) {
      console.error("Failed to call MongoDB function:", error);
      throw error;
    }
};