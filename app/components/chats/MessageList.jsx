import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RoomsMessageList } from "../../services/chats-realm";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import ConvofiAI from "/public/ConvofiAI.svg";
import { GetLiveMessages } from "@/app/services/chats-realm-watch";
import Image from "next/image";


const MessageList = (props) => {
    const [selected, setSelected] = useState(props?.room || null);
    const [asset, setAsset] = useState();
    const [roomlist, setRoomList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState();
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(true)
    var [Arr, setArr] = useState([]);
    var [wait, setWait] = useState();
    const router = useRouter();

    const containerRef = useRef(null);
    const messagesEndRef = useRef();
    const fileInputRef = useRef(null);



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

    useEffect(() => {
        setRoomId(props?.room?.item || null);
    }, [props]);


    const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    };

    useEffect(() => {
        if (asset) {
            setLoading(true)
            setFetching(true)
            const fetchdata = async () => {
                var res = await RoomsMessageList({ data: { room: roomId || "" } })
                // console.log(res)
                if (res.stat) {
                    setMessages(res.data.list);
                    setLoading(false)
                    setFetching(false)
                }
            };

            fetchdata();
            setWait(false);
        }
    }, [roomId]);


    useEffect(() => {
        const fetchupdate = async () => {
            var res = await GetLiveMessages(roomId); // db watch for live messages update

            if (roomId && res) {
                setArr([res]);
            }
            setRefresh(false);
            setWait(false);
            // props.handleRefresh(!refresh)
        };
        fetchupdate();
        // }
    }, [refresh, roomId]);

    useEffect(() => {
        if (Arr.length > 0 && Arr[Arr.length - 1]?.room === roomId) {
            const latestMessage = Arr[Arr.length - 1]; // Get the latest message
            const existingIndex = messages.findIndex(
                (item) => item.item === latestMessage.item
            );

            if (existingIndex === -1) {
                setMessages((prev) => [...prev, latestMessage]);

                

                setArr([]);
                setRefresh(true);
                props.waiting(false);
                scrollToBottom();
            }
        }
    }, [refresh, Arr]);


    if (fetching) return (

        <div className='p-2 border  bg-white rounded flex items-center gap-2 mt-2'>
            <p className='text-sm text-gray-600'>Please Wait...</p>
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>

    )


    return (
        <div>
            {" "}
            {roomId === null || "" ? (
                <div className="container px-0">
                    <div className="p-4 rounded-4" style={{ backgroundColor: "#f5f5f5" }}>
                        <h2 style={{ fontFamily: "serif" }}>
                            <i className="bx bxs-bolt-circle text-primary"></i>
                        </h2>
                        <p>
                            No room Selected
                        </p>
                    </div>
                    <WebbDividerMedium />
                    <WebbDividerMedium />
                    <WebbDividerMedium />
                    <div className="d-lg-flex gap-4 "></div>
                </div>
            ) : (
                <div className="p-0 m-0">
                    <div className="flex border bg-white ">
                       <Image
                            src={ConvofiAI}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="w-30 h-10 rounded-full object-cover border mx-3"
                        />
                        <p className="mx-3 mt-3" style={{ height: '60px' }}>{props.room.name}</p>
                    </div>
                    <div className={`${roomId ? "mx-5 mt-2 " : "hidden"}`}>
                        <div ref={containerRef} className="pb-52">
                            {messages &&
                                messages.map((item, i) => (
                                    <div key={i} className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                        {/* Header with sender & timestamp */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                {item?.sndr?.item === asset.item ? (
                                                    <Jazzicon
                                                        diameter={20}
                                                        seed={jsNumberForAddress(item?.sndr?.item || Date.now().toString())}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={ConvofiAI}
                                                        alt="AI Icon"
                                                        width={20}
                                                        height={20}
                                                        priority
                                                        className="rounded-full"
                                                    />
                                                )}
                                                <span className="text-sm font-medium text-gray-700">{item?.sndr?.name || "******"}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {new Date(parseInt(item?.crts)).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Message content */}
                                        <div className="px-2">
                                            <p className="text-sm text-gray-800 break-words mx-4">{item?.text}</p>
                                        </div>
                                    </div>
                                ))}

                            {/* Typing indicator */}
                            {wait && (
                                <div className="mx-4 mt-2">
                                    <img
                                        src="https://media.tenor.com/sMenWFrH3YsAAAAC/typing-text.gif"
                                        alt="Typing..."
                                        className="w-20 h-10"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Spacer */}
                    <div ref={containerRef} className="mb-20" />
                </div>
            )}
        </div>
    );
};

export default MessageList;