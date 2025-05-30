import * as Realm from "realm-web";
const app = new Realm.App({ id: "convofi-rooms-rqniqih" })




export const GetRoomNotification = async (item) => {
    const user = await app.logIn(
      Realm.Credentials.apiKey(
        "gXih3Dw5G9vNvQOkEgb1zGEr55vE9VVpRs9uBHy68f85Z2RqF6VSYZNuZCxVQljv"
      )
    );
    const mndb = app.currentUser.mongoClient("mongodb-atlas");
    const dbse = mndb
      .db("trxnmquzhcia")
      .collection("room");
  
    for await (const docx of dbse.watch()) {
      switch (docx.operationType) {
        case "update": {
          const { documentKey, fullDocument } = docx;
          //console.log(`new: ${documentKey.toString()}`, fullDocument);
          return fullDocument;
          break;
        }
        case "insert": {
          const { documentKey, fullDocument } = docx;
         // console.log(`new: ${documentKey.toString()}`, fullDocument);
          return fullDocument;
          break;
        }
      }
    }
  };

  export const GetLiveMessages = async (roomid) => {
    // console.log(roomid);
  
    const user = await app.logIn(
      Realm.Credentials.apiKey(
        "gXih3Dw5G9vNvQOkEgb1zGEr55vE9VVpRs9uBHy68f85Z2RqF6VSYZNuZCxVQljv"
      )
    );
    const mndb = app.currentUser.mongoClient("mongodb-atlas");
    const dbse = mndb
      .db("trxnmquzhcia")
      .collection("memo");
  
    const changeStream = dbse.watch({
      filter: {
        operationType: "insert",
        "fullDocument.room": roomid,
      },
    });
  
    // console.log(changeStream.on)
  
    for await (const change of changeStream) {
      switch (change.operationType) {
        case "insert": {
          const { documentKey, fullDocument } = change;
          changeStream.return();
          return fullDocument;
        }
      }
    }

  
    // for await (const docx of dbse.watch({
    //   filter: {
    //     operationType: "insert",
    //     "fullDocument.room": roomid,
    //   },
    //   filter: {
    //     operationType: "update",
    //     "fullDocument.room": roomid,
    //   },
    // }))
    //   {
    //     const { documentKey, fullDocument } = docx;
  
    //     // return  fullDocument
  
    //       switch (docx.operationType) {
    //         case "update": {
    //           const { documentKey, fullDocument } = docx;
    //           if(fullDocument.room != roomid) break;
    //           else return fullDocument
    //         }
    //         case "insert": {
    //           const { documentKey, fullDocument } = docx;
    //           if(fullDocument.room != roomid) break;
    //           else return fullDocument
  
    //           // console.log(`new: ${documentKey.toString()}`, fullDocument);
    //         }
  
    //       }
    //     }
  };