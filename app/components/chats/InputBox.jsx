import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AddMessageToRoom } from "../../services/chats-realm";


const Inputbox = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [asset, setAsset] = useState();
    const [recording, setRecording] = useState(false);

    const recognitionRef = useRef(null);
    const silenceTimeoutRef = useRef(null);

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
        // console.log(res)
 
        //console.log(datx);
        // const res = await fetch("/api/user-send-message", {
        //     body: JSON.stringify({ data: datx, srvc: "******" }),
        //     headers: { "Content-Type": "application/json" },
        //     method: "POST",
        // });
        // var result = JSON.parse(await res.json());
        //console.log(result)
        props.waiting(true);
        if (props?.room == null) {
            // this is the case where we need to set room details and render UI
            props.newroomselect(result?.data?.room);
            props.waiting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-auto border ">
            <form
                className="w-100 p-3 rounded-4 d-flex justify-content-between align-items-center gap-3"
                style={{ backgroundColor: "white" }}
                onSubmit={handleSubmit}
            >
                <span
                    
                    style={{ cursor: "pointer" }}
                >
                   
                </span>
                    <input
                        disabled={props.wait}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(e);
                            }
                        }}
                        type="text"
                        name="text-input"
                        id="input"
                        placeholder="Send a message."
                        value={inputValue}
                        onChange={handleChange}
                        className="form-control border-0 py-2 w-100"
                        style={{ backgroundColor: "white", outline: "none" }}
                    />
                <button className="border-0 bg-transparent" type="submit">
                    <i className="bx bx-send fs-5 text-secondary"></i>
                </button>
            </form>
        </div>
    );
};

export default Inputbox;