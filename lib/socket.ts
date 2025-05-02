import { io, Socket } from 'socket.io-client';
import { SocketMessage } from './api';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Add event listeners
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  socket.connect();
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToConversation = (
  conversationId: string,
  onMessage: (message: SocketMessage) => void
) => {
  if (!socket) return;

  socket.emit('join', { conversationId });
  socket.on('message', onMessage);
};

export const unsubscribeFromConversation = (conversationId: string) => {
  if (!socket) return;

  socket.emit('leave', { conversationId });
  socket.off('message');
};

export const sendSocketMessage = (message: SocketMessage) => {
  if (!socket) return;

  socket.emit('message', message);
};

export default socket; 