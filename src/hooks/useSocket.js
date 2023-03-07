import { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL;

const useSocket = (eventName) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(socketUrl);
    console.log(`Socket Connected`);

    socketRef.current.on(eventName, (message) => {
      setMessages(JSON.parse(message));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [eventName]);

  const sendMessage = (event, messageBody) => {
    socketRef.current.emit(event, messageBody);
  };

  return { messages, sendMessage };
};

export default useSocket;
