import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  CheckCircle2, 
  RefreshCw, 
  BookOpen, 
  ShieldCheck,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Mic,
  MicOff,
  Radio
} from 'lucide-react';
import { ChatMessage } from '../../types/portfolio';

interface ChatbotLabProps {
  onOpenVoiceModal?: () => void;
}

export const ChatbotLab: React.FC<ChatbotLabProps> = ({ onOpenVoiceModal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am Sandeep AI, grounded strictly in Sandeep Kumar Chaurasiya's verified resume, projects, and professional background. You can type your query or click the microphone to speak with me in English or Hindi. How can I assist you?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          source: 'Resume → Personal Profile',
          section: 'Verified Identity',
          excerpt: 'Sandeep Kumar Chaurasiya: 5+ Years IT Experience, 4+ Years Training, AI & Data Science.',
        },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [autoVoiceReply, setAutoVoiceReply] = useState(false);
  const [language, setLanguage] = useState<'en-US' | 'hi-IN'>('en-US');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const sampleQuestions = [
    'Who is Sandeep?',
    'What AI & GenAI technologies does Sandeep know?',
    'Tell me about his Local RAG project.',
    'Does he have experience with LangGraph and Agents?',
    'What did he build at Aptus IT Solution?',
    'What are his contact details?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const transcriptAccumulatorRef = useRef<string>('');

  const handleToggleVoiceInput = async () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice speech recognition is supported in Google Chrome, Microsoft Edge, Safari, and Opera.");
      return;
    }

    // Try requesting mic stream first to prompt browser permission dialog if needed
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err: any) {
      console.warn("Microphone check:", err);
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = language;
      transcriptAccumulatorRef.current = '';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let final = '';
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          transcriptAccumulatorRef.current = (transcriptAccumulatorRef.current ? transcriptAccumulatorRef.current + ' ' : '') + final;
        }
        const combined = (transcriptAccumulatorRef.current + (interim ? ' ' + interim : '')).trim();
        setInput(combined);
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition notice:", e.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalVal = transcriptAccumulatorRef.current.trim();
        if (finalVal) {
          setInput(finalVal);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.text || "I don't have verified information about that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (autoVoiceReply && data.text) {
        speakText(data.text);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I am currently in local grounded mode. Sandeep has 5+ years of IT engineering experience specializing in RAG architectures (LangChain, Ollama, ChromaDB), LangGraph agentic workflows, and predictive machine learning models at Aptus IT Solution.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            source: 'Resume → Grounded Profile',
            section: 'Aptus IT Solution',
            excerpt: 'Role: Data Science / AI Engineer (May 2025–Present)',
          },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text
        .replace(/[*#_`]/g, '')
        .replace(/\[\d+\]/g, '')
        .replace(/https?:\/\/\S+/g, 'link')
        .trim();
      if (!clean) return;
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = language;
      utterance.rate = 1.02;

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = language.split('-')[0].toLowerCase();
        const matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) || voices[0];
        if (matched) utterance.voice = matched;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
      {/* Chat Header in Crisp Contrast Palette */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Sandeep AI & Voice Assistant</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                TEXT + VOICE
              </span>
            </div>
            <div className="text-xs text-slate-600 font-mono">
              Ask by typing or speaking in English or Hindi (grounded citations)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct Voice Modal Trigger */}
          {onOpenVoiceModal && (
            <button
              onClick={onOpenVoiceModal}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Launch Fullscreen Direct Voice Chat"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Voice Mode 🎙️</span>
            </button>
          )}

          {/* Auto voice reply toggle */}
          <button
            onClick={() => setAutoVoiceReply(!autoVoiceReply)}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 transition-colors ${
              autoVoiceReply
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
            }`}
            title={autoVoiceReply ? "Auto-Voice reading active" : "Enable automatic voice reply"}
          >
            {autoVoiceReply ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{autoVoiceReply ? 'Voice On' : 'Voice Off'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setMessages([
                {
                  id: 'welcome',
                  sender: 'assistant',
                  text: "Session cleared. What would you like to know about Sandeep's skills or background?",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-mono flex items-center gap-1 transition-colors border border-transparent hover:border-slate-200"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
        <span className="text-slate-700 shrink-0 text-[11px] pl-1 font-bold">Suggested:</span>
        {sampleQuestions.slice(0, 4).map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50 shrink-0 transition-colors font-medium shadow-xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2">
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 rounded-tl-none font-normal'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Citations Box for AI responses */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] font-mono space-y-1">
                    <div className="text-emerald-800 font-bold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-700" />
                      <span>Verified Citations:</span>
                    </div>
                    {msg.citations.map((c, cIdx) => (
                      <div key={cIdx} className="text-slate-700 pl-3 border-l-2 border-emerald-600">
                        <span className="text-slate-900 font-bold">{c.source}</span>
                        {c.section && <span> ({c.section})</span>}
                      </div>
                    ))}
                  </div>
                )}

                {!isUser && (
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="hover:text-emerald-700 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(msg.text);
                        setCopiedId(msg.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="hover:text-slate-900 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Synthesizing grounded answer from portfolio knowledge base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar with Direct Voice Recognition button */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={isListening ? "Listening... Speak now" : "Ask about Sandeep's RAG projects, LangGraph, Python, or experience..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className={`w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none transition-colors ${
                isListening
                  ? 'border-red-500 ring-2 ring-red-400/20'
                  : 'border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            {/* Inline mic button inside the input */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100'
              }`}
              title={isListening ? "Stop listening" : "Click to speak with microphone"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            Mic Speech-to-Text & Grounded RAG Guardrail Active
          </span>
          <span>FastAPI / Node Proxy</span>
        </div>
      </div>
    </div>
  );
};
