// src/App.jsx
import { useState } from "react";
import Inbox from "./component/Inbox";
import Chat from "./component/Chat";
import AICopilot from "./component/AICopilot";

const dummyChats = {
  1: {
    name: "Luis Easton",
    messages: [
      { from: "user", text: "I bought a product from your store in November as a Christmas gift for amember of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened." },
      { from: "agent", text: "Let me just look into this for you, Luis." },
    ],
  },
  2: {
    name: "Ivan",
    messages: [
      { from: "user", text: "Hi there, I have a question about my order..." },
      { from: "agent", text: "Sure, how can I help you, Ivan?" },
    ],
  },
  3: {
    name: "Lead from New York",
    messages: [
      { from: "user", text: "Good morning, let me explain the problem..." },
      { from: "agent", text: "I'm listening, go ahead." },
    ],
  },
  4: {
    name: "Luis - Small Crafts",
    messages: [
      { from: "user", text: "Bug report on Booking API" },
      { from: "agent", text: "Thank you for reporting, we're investigating." },
    ],
  },
  5: {
    name: "Miracle - Exemplary Bank",
    messages: [
      { from: "user", text: "Hey there, I’m here to resolve the issue..." },
      { from: "agent", text: "Thank you for contacting us, Miracle." },
    ],
  },
};

export default function App() {
  const [activeChatId, setActiveChatId] = useState(1);

  return (
    <div className="flex h-screen">
      <Inbox activeId={activeChatId} onSelect={setActiveChatId} />
      <Chat chat={dummyChats[activeChatId]} />
      <AICopilot />
      
    </div>
  );
}
