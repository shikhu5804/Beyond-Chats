import { useEffect, useState } from "react";
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
        text: "Hi there, I have a question about my order placed last Friday...",
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
        text: "Good morning, let me explain the problem I've been facing...",
      },
      {
        from: "agent",
        text: "I'm listening, go ahead. I’ll take detailed notes and pass this along to the dev team.",
      },
    ],
  },
  4: {
    name: "Luis - Small Crafts",
    iconText: <FaTicketAlt />,
    iconBg: "bg-indigo-700",
    messages: [
      {
        from: "user",
        text: "I wanted to report a critical bug related to the Booking API...",
      },
      {
        from: "agent",
        text: "Thank you for reporting this. We're currently investigating the issue.",
      },
    ],
  },
  5: {
    name: "Miracle - Exemplary Bank",
    iconText: <FaArrowLeft className="text-gray-700" />,
    iconBg: "bg-gray-300",
    messages: [
      {
        from: "user",
        text: "Hey there, I’m here to resolve the issue I raised earlier...",
      },
      {
        from: "agent",
        text: "Thank you for contacting us, Miracle. Let me check the transaction logs.",
      },
    ],
  },
};

export default function App() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(dummyChats);
  const [inputText, setInputText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

  const handleBackToInbox = () => setActiveChatId(null);

  return (
    <div className="flex h-screen w-full">
      {/* Desktop View */}
      {!isMobile && (
        <>
          <Inbox activeId={activeChatId} onSelect={setActiveChatId} />
          <Chat
            chat={chats[activeChatId]}
            onSend={handleSendMessage}
            input={inputText}
            setInput={setInputText}
          />
          <AICopilot setInput={setInputText} />
        </>
      )}

      {/* Mobile View */}
      {isMobile && (
        <>
          {!activeChatId ? (
            <Inbox activeId={activeChatId} onSelect={setActiveChatId} />
          ) : (
            <div className="flex flex-col w-full">
              <div className="p-2 bg-white border-b flex items-center">
                <button onClick={handleBackToInbox} className="mr-2 text-blue-600">
                  <FaArrowLeft />
                </button>
                <span className="text-sm font-medium">Back to Inbox</span>
              </div>
              <Chat
                chat={chats[activeChatId]}
                onSend={handleSendMessage}
                input={inputText}
                setInput={setInputText}
              />
              <AICopilot setInput={setInputText} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
