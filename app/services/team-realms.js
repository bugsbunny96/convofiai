import { App } from "realm-web";

const app = new App({
    id: "convofi-agents-zzqcxbo",
});

export const TeamAccountCreate = async (item) => {
    try {
      var apiKey ="i2bp5M72XwLWsE9v6vUccG9PnJBOZTk01ijJ1SduiGgmLNTKVEEgu6WjxQ7RcBxb";
      const credentials = App.Credentials.apiKey(apiKey);
      const user = await app.logIn(credentials);
  
      const datx = { data: item.body.data, srvc: "988b9aee-f02a-411c-957d-02ef420586a2" };
     
  
      // Arguments for the function
      const args = [
        {
          body: JSON.stringify(datx),
        },
      ];
  
      // Call the MongoDB App Services function
      const result = await user.functions["team_member_create"](...args);
      const data = result.stat
        ? result.data
        : result.data;
      return { ...result, data };
    } catch (error) {
      console.error("Failed to call MongoDB function:", error);
      throw error;
    }
  };