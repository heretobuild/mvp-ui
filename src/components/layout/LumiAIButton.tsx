import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import LumiAIChat from "../chat/LumiAIChat";

const LumiAIButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleToggleChat = () => {
    if (minimized) {
      setMinimized(false);
    } else {
      setShowChat(!showChat);
    }
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <>
      {!showChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={handleToggleChat}
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}

      {showChat && (
        <LumiAIChat
          onClose={() => setShowChat(false)}
          onMinimize={handleMinimize}
          minimized={minimized}
        />
      )}
    </>
  );
};

export default LumiAIButton;
