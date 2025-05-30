'use client';

import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ConversationList from '../../components/conversations/ConversationList';
import ChatWindow from '../../components/conversations/ChatWindow';
import ConversationDetails from '../../components/conversations/ConversationDetails/ConversationDetails';
import EmptyChatState from '../../components/conversations/EmptyChatState';
import useChatStore from '../../contexts/useChatStore';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import Chathistory from '../../components/chats/ConversationList';
import Inputbox from '../../components/chats/InputBox';

export default function ConversationsPage() {
  const selectedConversation = useChatStore((state) => state.selectedConversation);

  const [roomselected, setRoomSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modelSelected, setModelSelected] = useState("AI");
  const [wait, setWait] = useState(false);
  const [memo, setMemo] = useState("");
  const [encodedAudio, setEncodedAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [encodings, setEncodings] = useState(null);
  const [showAudio, setShowAudio] = useState(false);
  const [showInput, setShowInput] = useState(false)

//   useEffect(() => {
//     connectSocket();
//     return () => {
//       disconnectSocket();
//     };
//   }, []);


  const ResetRoomSelection = async () => {
    setRoomSelected(null);
    setShowInput(true)
  };

  const handleWait = async (val) => {
    setWait(val);
  };

  const handleRoomSelect = async (item) => {
    setRoomSelected(item);
    setRefresh(!refresh);
  };
  
  const handleRefresh = async (item) => {
    setRefresh(!refresh);
  };

  const handleNewRoomSelected = async (item) => {
    var result = {}
    if (result.stat) {
      setTimeout(() => {
        setRoomSelected(result.data);
      }, 2000);
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
        {/* Left Sidebar - Conversation List */}
        <div className="hidden md:block md:w-80 border-r border-gray-200 bg-white">
          {/* <ConversationList /> */}
          <Chathistory 
            selectroom={handleRoomSelect}
            handleRefresh={handleRefresh}
            handleRoomReset={ResetRoomSelection}
          />
        </div>

        {/* Main Chat Window */}
        <div className="flex-1 bg-gray-50 w-full">
          {/* Mobile header for context */}
          <div className="md:hidden p-4 border-b border-gray-200 bg-white font-semibold text-lg">
            Conversations
          </div>
          {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} />
          ) : (
            <div className=''>
            <EmptyChatState />
            <div style={{ display: showInput ? 'block':'none'}}>
             <Inputbox
                      
                      wait={wait}
                      waiting={handleWait}
                      room={roomselected}
                      refresh={refresh}
                      newroomselect={handleNewRoomSelected}
                      modelSelected={modelSelected}
                    />
            </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Conversation Details */}
        {selectedConversation && (
          <div className="hidden md:block md:w-80 border-l border-gray-200 bg-white">
            <ConversationDetails conversation={selectedConversation} />
          </div>
        )}
      </div>
    </MainLayout>
  );
} 