import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, X, Minimize, Maximize, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface LumiAIChatProps {
  onClose?: () => void;
  onMinimize?: () => void;
  minimized?: boolean;
}

const LumiAIChat: React.FC<LumiAIChatProps> = ({
  onClose = () => {},
  onMinimize = () => {},
  minimized = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I'm Lumi, your health assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample health suggestions for demo purposes
  const healthSuggestions = [
    "Tell me about my recent lab results",
    "What preventive screenings should I get?",
    "How can I improve my sleep quality?",
    "What do my vision prescription numbers mean?",
    "When is my next vaccination due?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  // Simple response generation based on keywords in the user's message
  const generateAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (
      lowerCaseMessage.includes("lab") ||
      lowerCaseMessage.includes("test") ||
      lowerCaseMessage.includes("result")
    ) {
      return "Based on your recent lab results, your cholesterol levels have improved since your last test. Your HDL is now within the optimal range, though your LDL is still slightly elevated. I recommend continuing with your current diet and exercise regimen.";
    }

    if (
      lowerCaseMessage.includes("screening") ||
      lowerCaseMessage.includes("preventive") ||
      lowerCaseMessage.includes("check")
    ) {
      return "Based on your age and health profile, I recommend scheduling these preventive screenings: annual physical exam, cholesterol screening, and blood pressure check. Since you're over 45, you should also consider colorectal cancer screening. Would you like me to provide more details on any of these?";
    }

    if (lowerCaseMessage.includes("sleep")) {
      return "To improve your sleep quality, consider these evidence-based tips: maintain a consistent sleep schedule, limit screen time before bed, ensure your bedroom is dark and cool, avoid caffeine after noon, and try relaxation techniques like deep breathing before bedtime. Your health records show you've mentioned sleep issues during your last two appointments.";
    }

    if (
      lowerCaseMessage.includes("vision") ||
      lowerCaseMessage.includes("prescription") ||
      lowerCaseMessage.includes("eye")
    ) {
      return "In your vision prescription, the numbers represent diopters. Your right eye (-1.75) and left eye (-2.00) values indicate mild nearsightedness. The cylinder values (-0.50 and -0.75) correct for astigmatism. Your prescription hasn't changed significantly since your last exam 10 months ago.";
    }

    if (
      lowerCaseMessage.includes("vaccine") ||
      lowerCaseMessage.includes("vaccination") ||
      lowerCaseMessage.includes("immunization")
    ) {
      return "According to your records, you're due for your annual flu shot this month. Also, your Tdap booster will be due next year. Your COVID-19 vaccination is up to date with the latest booster received 6 months ago.";
    }

    if (
      lowerCaseMessage.includes("dental") ||
      lowerCaseMessage.includes("teeth")
    ) {
      return "Your last dental visit was 4 months ago for a routine cleaning. The dentist noted minor plaque buildup on your lower molars and recommended more thorough flossing in that area. Your next dental checkup is scheduled for 2 months from now.";
    }

    if (
      lowerCaseMessage.includes("medication") ||
      lowerCaseMessage.includes("medicine") ||
      lowerCaseMessage.includes("pill")
    ) {
      return "I see you're currently taking Vitamin D (1000 IU twice daily) and Lisinopril (10mg once daily). Your Lisinopril prescription needs to be refilled within the next week. Would you like me to remind you about this again tomorrow?";
    }

    if (
      lowerCaseMessage.includes("exercise") ||
      lowerCaseMessage.includes("workout") ||
      lowerCaseMessage.includes("activity")
    ) {
      return "Based on your health profile, I recommend aiming for 150 minutes of moderate aerobic activity weekly, plus muscle-strengthening activities twice a week. Walking, swimming, or cycling would be excellent choices given your joint health history. Your records show you've been increasingly active over the past 3 months - great progress!";
    }

    if (
      lowerCaseMessage.includes("diet") ||
      lowerCaseMessage.includes("nutrition") ||
      lowerCaseMessage.includes("eat")
    ) {
      return "Looking at your health data, I'd recommend increasing your daily water intake and adding more fiber-rich foods to your diet. Your last blood work showed slightly low vitamin D levels, so consider foods rich in vitamin D or spending more time outdoors. Would you like some specific meal suggestions?";
    }

    // Default response if no keywords match
    return "I don't have specific information about that in your health records. Would you like me to provide general health guidance on this topic, or can I help with something else?";
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onMinimize}
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 flex items-center justify-center"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[380px] shadow-xl rounded-lg overflow-hidden">
      <Card className="border-0">
        <CardHeader className="bg-primary text-primary-foreground py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary-foreground">
                <AvatarImage src="/lumi-avatar.png" alt="Lumi AI" />
                <AvatarFallback className="bg-primary-foreground text-primary">
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-base font-medium">
                Lumi Health Assistant
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary/90"
                onClick={onMinimize}
              >
                <Minimize className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary/90"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[350px] p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestions */}
          <div className="px-4 py-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {healthSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs py-1 h-auto"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your health records..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LumiAIChat;
