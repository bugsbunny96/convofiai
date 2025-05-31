import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AddMessageToRoom } from "../../services/chats-realm";
import { FiSend } from "react-icons/fi";

const Inputbox = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [asset, setAsset] = useState();
    const router = useRouter();


    

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("convofyai_selected_account"));
        // console.log(asset)
        setAsset(user);
        if (user == null) {
            router.push("/auth");
        }
    }, []);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (inputValue.trim() !== "") {
            setMessages([...messages, inputValue]);
            setInputValue("");
            AddMessage();
        }
    };

    const AddMessage = async () => {
        var datx = {
            text: inputValue,
            template: "",
            mode: "text",
            media: {},
            room: props?.room?.item || null,
            sender: {
                name: asset.name,
                mail: asset.mail,
                item: asset.item,
                mobile: asset.mobile,
            },
            receiver: {
                name: "Convofy AI Support",
                mail: "aisupport@convofy.co",
                item: "",
                mobile: "",
            },
            searchModel: "AI",
        };

        var result = await AddMessageToRoom({data:datx})
       
        props.waiting(true);
        if (props?.room == null) {
            // this is the case where we need to set room details and render UI
            props.newroomselect(result?.data?.room);
            
        }
        props.waiting(false);
    };

    return (
        <div className="flex justify-center mt-auto border-t bg-white">
      <form
        className="w-full flex items-center gap-3 px-4 py-3"
        onSubmit={handleSubmit}
      >
        <input
          disabled={props.wait}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
          type="text"
          name="text-input"
          id="input"
          placeholder="Send a message..."
          value={inputValue}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <button
          type="submit"
          className="text-blue-500 hover:text-blue-700 p-2 rounded-full disabled:opacity-50"
          disabled={props.wait || !inputValue.trim()}
        >
          <FiSend className="text-2xl" />
        </button>
      </form>
    </div>
    );
};

export default Inputbox;