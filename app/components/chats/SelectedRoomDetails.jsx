import React from 'react';
import Image from 'next/image';
import ConvofiAI from "/public/ConvofiAI.svg";

const SelectedRoomDetails = ({ room }) => {
  const {
    desc,
    name,
    lastMessage,
    mots,
    seen,
    user,
    actv,
  } = room;

  const formattedTime = new Date(parseInt(mots)).toLocaleDateString();

  return (
    <div className="p-4  shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col gap-6 border border-gray-100">
      {/* Top: Room Info */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
          <Image
            src={ConvofiAI}
            alt="Avatar"
            width={94}
            height={64}
           // className="w-full h-full rounded-full object-cover"
          />
          {actv && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>

        {/* Room Details */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-600">{desc}</p>
          {lastMessage ? (
            <p className="mt-1 text-sm text-gray-800 truncate">
              💬 {lastMessage}
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-400 italic">No messages yet</p>
          )}
          <p className="mt-1 text-xs text-gray-500">🕒 {formattedTime}</p>
        </div>
      </div>

      {/* Bottom: Creator Info */}
      <div className="border-t pt-4 text-sm text-gray-700">
        <p>
          👤 <strong>{user.name}</strong>
        </p>
        <p>📧 {user.mail}</p>
        <p>📱 {user.mobile}</p>
        <p className="mt-2 text-xs">
          {seen ? (
            <span className="text-green-600 font-medium">✓ Seen</span>
          ) : (
            <span className="text-red-500 font-medium">• Unseen</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SelectedRoomDetails;
