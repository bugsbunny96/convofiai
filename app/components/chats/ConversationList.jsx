
import React, { useEffect, useState } from "react";
import { ChatRoomList } from "../../services/chats-realm";
import { GetRoomNotification } from "../../services/chats-realm-watch";
import { useRouter } from "next/navigation";
import ConvofiAI from "/public/ConvofiAI.svg";
import Image from "next/image";

const Chathistory = (props) => {

  const [loading, setLoading] = useState(true)
  const [asset, setAsset] = useState();
  const [roomlist, setRoomList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState(props?.room || null);

  const router = useRouter();
  const { pathname } = router;

  // console.log("PPPPPPPPPPP",pathname)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("convofyai_selected_account"));
    // console.log(asset)
    setAsset(user);
    if (user == null) {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (asset) {
      setLoading(true)
      const fetchdata = async () => {
        var res = await ChatRoomList({ user: asset.item })
        // console.log(res)
        if (res.stat) {
          setRoomList(res.data.list)
          setLoading(false)
        }
      };

      fetchdata();
    }
  }, [asset]);

    useEffect(() => {
    if (asset) {
      // setLoading(true)
      const fetchdata = async () => {
        var res = await ChatRoomList({ user: asset.item })
        // console.log(res)
        if (res.stat) {
          setRoomList(res.data.list)
          // setLoading(false)
        }
      };

      fetchdata();
    }
  }, [asset, refresh]);


  useEffect(() => {
    const fetchupdate = async () => {
      var res = await GetRoomNotification();
      // console.log(res)
      setRefresh(!refresh);
      props.handleRefresh(!refresh);
    };
    fetchupdate();
  }, [refresh]);


  const handleRoomSelection = async (item) => {
    setSelected(item);
    props.selectroom(item);
  };
  //console.log("SetSelected:-",selected)

  const ResetRoom = () => {
    props.handleRoomReset();
    router.push("/conversations/chats");
  };



  return (
    <div className="mt-1 p-2">
      {/* <h3 className="text-sm mb-2" style={{ fontSize: "15px" }}>
        Chat History
      </h3> */}
      <button
        onClick={() => ResetRoom()}
        type="button"
        className="w-full bg-blue-100 text-gray-800 py-2.5 rounded-lg font-semibold mt-2 shadow-sm hover:bg-blue-200 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-300"
        style={{ outline: "none" }}
      >
        <i
          className="bx bx-plus"
          style={{ fontSize: "20px", marginRight: "5px" }}
        ></i>
        New Chat
      </button>
      <hr className="mt-2" />

      {
        loading && (
          <div className='p-2 border rounded flex items-center gap-2 mt-2'>
            <p className='text-sm text-gray-600'>Please Wait...</p>
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )
      }

      {
        !loading && roomlist && roomlist.length > 0 && roomlist.map((item, index) => {
          return (
            <>
              <div
                className={`p-3 sm:p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${true ? 'bg-gray-100' : ''
                  }`}
                onClick={() => handleRoomSelection(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                  }
                }}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {item ? (
                        <Image
                          src={ConvofiAI}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                          //style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primaryLight flex items-center justify-center">
                          {/* <span className="text-primary font-bold text-sm sm:text-base">{item?.desc?.toUpperCase()}</span> */}
                        </div>
                      )}
                    </div>
                    {/* Online/Offline Status */}
                    <div
                      className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white ${true
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-gray-400'
                        }`}
                      aria-label={true ? 'Online' : 'Offline'}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {item?.name}
                      </h3>
                      {item.lastMessage && (
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {new Date(parseInt(item.mots)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {/* {formatLastMessageTime(new Date(item.lastMessage.mots))} */}
                        </span>
                      )}
                    </div>

                    {/* Last Message */}
                    <div className="mt-0.5 sm:mt-1 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        {item.lastMessage ? (
                          <p
                            className={`text-xs sm:text-sm truncate ${item?.unreadCount > 0 && !true
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-500'
                              }`}
                            title={item.lastMessage}
                          >
                            {item.lastMessage}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm text-gray-400 italic">No messages yet</p>
                        )}
                      </div>

                      {/* Unread Count */}
                      {item?.unreadCount > 0 && !isActive && (
                        <span
                          className="ml-2 inline-flex items-center justify-center px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-bold leading-none text-white bg-primary rounded-full"
                          aria-label={`${conversation.unreadCount} unread message${conversation.unreadCount > 1 ? 's' : ''}`}
                        >
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })
      }
      {
        !loading && roomlist && roomlist.length == 0 ?
          <div className='p-2 border rounded flex items-center gap-2 mt-2'>
            <p className='text-sm text-gray-600'>No Chat Room Found</p>
            {/* <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div> */}
          </div>
          :
          <></>
      }
    </div>
  );
};

export default Chathistory;
