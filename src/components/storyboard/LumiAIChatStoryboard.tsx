import React from "react";
import LumiAIChat from "../chat/LumiAIChat";

const LumiAIChatStoryboard = () => {
  return (
    <div className="bg-white w-full h-full p-8 flex items-center justify-center">
      <div className="w-[380px] shadow-xl rounded-lg overflow-hidden">
        <LumiAIChat
          onClose={() => console.log("Close clicked")}
          onMinimize={() => console.log("Minimize clicked")}
          minimized={false}
        />
      </div>
    </div>
  );
};

export default LumiAIChatStoryboard;
