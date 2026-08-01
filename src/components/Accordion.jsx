import { useState, useRef } from "react";

const FAQS = [
  {
    q: "How do I join the server?",
    a: "Open Minecraft, click Multiplayer, then Add Server. Enter our server IP address and click Join Server. Make sure you're using the correct Minecraft version listed on our website.",
  },
  {
    q: "Is the server free to play?",
    a: "Yes. Everyone can join and enjoy the server for free. Optional ranks and cosmetics may be available to help support server development and maintenance.",
  },
  {
    q: "How can I report a player?",
    a: "You can report players through our Discord server. Provide screenshots, videos, or any evidence that can help staff review the situation.",
  },
  {
    q: "Where can I get support?",
    a: "Join our Discord community for help with technical issues, gameplay questions, bug reports, and account support. Our staff team will be happy to assist you.",
  },
];

function AccordionItem({ q, a }) {
  const [active, setActive] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className="accordion-item">
      <div
        className={"accordion-item-header" + (active ? " active" : "")}
        onClick={() => setActive((v) => !v)}
      >
        {q}
      </div>
      <div
        className="accordion-item-body"
        style={{ maxHeight: active ? `${bodyRef.current?.scrollHeight ?? 0}px` : "0px" }}
      >
        <div className="accordion-item-body-content" ref={bodyRef}>
          {a}
        </div>
      </div>
    </div>
  );
}

export default function Accordion() {
  return (
    <div className="accordion faqList">
      {FAQS.map((f) => (
        <AccordionItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}
