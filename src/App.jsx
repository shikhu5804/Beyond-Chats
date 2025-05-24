import { useState } from "react";
import Inbox from "./component/Inbox";
import Chat from "./component/Chat";
import AICopilot from "./component/AICopilot";
import { FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";


const dummyChats = {
  1: {
    name: "Luis Easton",
    iconText: "L",
    iconBg: "bg-blue-500",
    messages: [
      {
        from: "user",
        text: "I bought a product from your store a week ago, but unfortunately, it hasn't arrived yet. I was really looking forward to receiving it by now.",
      },
      {
        from: "agent",
        text: "Let me just look into this for you, Luis. I’ll check the status of order and update you .",
      },
    ],
  },
  2: {
    name: "Ivan - Nike",
    iconText: "I",
    iconBg: "bg-red-700",
    messages: [
      {
        from: "user",
        text: "Hi there, I have a question about my order placed last Friday. I received the confirmation email but haven't gotten any further updates about the shipment or estimated delivery date.",
      },
      {
        from: "agent",
        text: "Sure, how can I help you, Ivan? I’ll start by checking your order number and tracking info.",
      },
    ],
  },
  3: {
    name: "Lead from New York",
    iconText: "L",
    iconBg: "bg-black",
    messages: [
      {
        from: "user",
        text: "Good morning, let me explain the problem I've been facing. The checkout page seems to crash every time I try to place an order, and it's becoming quite frustrating.",
      },
      {
        from: "agent",
        text: "I'm listening, go ahead. I’ll take detailed notes and pass this along to the dev team.",
      },
    ],
  },
  4: {
    name: "Luis - Small Crafts",
    iconText: <FaTicketAlt/>,
    iconBg: "bg-indigo-700",
    messages: [
      {
        from: "user",
        text: "I wanted to report a critical bug related to the Booking API. It seems to throw a 500 server error when we try to book more than three items in one request.",
      },
      {
        from: "agent",
        text: "Thank you for reporting this. We're currently investigating the issue and will keep you posted on the fix.",
      },
    ],
  },
  5: {
    name: "Miracle - Exemplary Bank",
    iconText: <FaArrowLeft className="text-gray-700"/>,
    iconBg: "bg-gray-300",
    messages: [
      {
        from: "user",
        text: "Hey there, I’m here to resolve the issue I raised earlier regarding the failed transaction. The amount was debited from my account, but I haven’t received a confirmation or refund.",
      },
      {
        from: "agent",
        text: "Thank you for contacting us, Miracle. I understand how concerning that can be. Let me check the transaction logs.",
      },
    ],
  },
};

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(dummyChats);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (text) => {
    if (!text || !activeChatId) return;

    const newMessage = { from: "agent", text };
    const updatedMessages = [...chats[activeChatId].messages, newMessage];

    setChats({
      ...chats,
      [activeChatId]: {
        ...chats[activeChatId],
        messages: updatedMessages,
      },
    });
    setInputText("");
  };

  return (
    <div className="flex h-screen">
      <Inbox activeId={activeChatId} onSelect={setActiveChatId} />
     <Chat
  chat={chats[activeChatId]}
  onSend={handleSendMessage}
  input={inputText}
  setInput={setInputText}
/>
<AICopilot setInput={setInputText} />  
    </div>
  );
}
