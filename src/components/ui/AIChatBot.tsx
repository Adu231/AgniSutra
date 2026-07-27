import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const PRESETS = [
  { label: 'Check System Status', query: 'What is the current fire safety status of the system?' },
  { label: 'NFPA Compliance Info', query: 'Show me the standard compliance checklist rules (NFPA).' },
  { label: 'SOS Emergency Steps', query: 'What are the immediate steps during an SOS emergency?' },
];

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am AgniSutra AI, your safety assistant. I can help with equipment status, compliance rules, emergency protocols, or subscription plans. What would you like to check?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botText = "I'm analyzing your request. Can you provide more details about the equipment or site ID?";
      const lower = textToSend.toLowerCase();

      if (lower.includes('status') || lower.includes('health') || lower.includes('monitoring')) {
        botText = 'System Status: All IoT sensors active. 2,500+ facilities protected. One active alert: INC-041 (Smoke detected, Warehouse B Bay 3). All local dispatch teams notified.';
      } else if (lower.includes('compliance') || lower.includes('nfpa') || lower.includes('rules')) {
        botText = 'Compliance Summary: NFPA 10 governs portable fire extinguishers (requires monthly visual inspection). NFPA 72 governs alarms. Check the compliance templates section to export latest checklists.';
      } else if (lower.includes('sos') || lower.includes('emergency') || lower.includes('protocol')) {
        botText = 'Emergency Response Checklist:\n1. Trigger SOS Alarm immediately.\n2. Broadcast responder dispatch alerts.\n3. Follow primary evacuation path maps.\n4. Secure the assembly point perimeter.';
      } else if (lower.includes('pricing') || lower.includes('payment') || lower.includes('plan') || lower.includes('upgrade')) {
        botText = 'AgniSutra offers starter, professional, and enterprise subscription plans. Authenticated users bypass checkout for the Free Plan, while paid tiers redirect to the card secure validation page.';
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        botText = 'Hi there! How can I assist you with fire safety operations today?';
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] h-[500px] bg-card/95 backdrop-blur border border-border rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="gradient-fire p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  AgniSutra AI <Sparkles className="w-3.5 h-3.5" />
                </h4>
                <p className="text-[10px] text-white/80">Active Operations Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/85 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-rose-600 text-white rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none border border-border'
                }`}>
                  {m.text.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-muted border border-border rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Presets / Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-col gap-1.5">
              <p className="text-[10px] text-muted-foreground font-semibold">SUGGESTIONS</p>
              <div className="flex flex-wrap gap-1">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p.query)}
                    className="text-[10px] bg-muted hover:bg-muted/80 text-foreground border border-border rounded-full px-2.5 py-1 text-left transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="p-3 border-t border-border bg-card/50 flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask safety protocols..."
              className="h-9 text-xs focus-visible:ring-rose-500"
            />
            <Button type="submit" size="icon" className="h-9 w-9 bg-rose-600 hover:bg-rose-700 text-white shrink-0">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Button Logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gradient-fire text-white flex items-center justify-center shadow-xl shadow-rose-500/20 hover:scale-105 hover:rotate-6 transition-all duration-300 fire-glow"
        title="AgniSutra Copilot Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}
      </button>
    </div>
  );
};
