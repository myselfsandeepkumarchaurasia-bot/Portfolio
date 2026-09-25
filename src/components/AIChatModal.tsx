import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  MessageSquare, 
  PhoneCall, 
  RotateCcw, 
  Check, 
  Copy, 
  BookOpen, 
  ShieldCheck, 
  Radio, 
  AlertCircle,
  Play,
  Square
} from 'lucide-react';
import { ChatMessage } from '../types/portfolio';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'chat' | 'voice';
  onOpenVoiceModal?: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ 
  isOpen, 
  onClose,
  initialMode = 'chat'
}) => {
  // Mode: 'chat' for text + speech-to-text, 'voice' for full-screen spoken call
  const [activeMode, setActiveMode] = useState<'chat' | 'voice'>(initialMode);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am Sandeep AI, grounded strictly in Sandeep Kumar Chaurasiya's verified resume, projects, and professional background. You can type your query or click the microphone to speak with me in English or Hindi. How can I assist you?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          source: 'Verified Resume',
          section: 'Personal Profile',
          excerpt: 'Sandeep Kumar Chaurasiya — 5+ Years IT Experience, AI & Data Science Engineer.',
        },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice Engine State
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [continuousMode, setContinuousMode] = useState(false);
  const [language, setLanguage] = useState<'en-US' | 'hi-IN'>('en-US');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // Latest voice call interaction
  const [voiceQuery, setVoiceQuery] = useState<string>('');
  const [voiceResponse, setVoiceResponse] = useState<string>(
    "Hello! I am Sandeep AI Voice Assistant. Speak naturally in English or Hindi, or tap a question below to hear me respond."
  );

  // Refs to avoid React stale closure bugs in Web Speech API events
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isListeningRef = useRef<boolean>(false);

  // Sample prompt questions
  const sampleQuestions = [
    { label: 'Overview', text: 'Who is Sandeep Kumar Chaurasiya?' },
    { label: 'Qualifications', text: 'What are his MCA and BCA academic qualifications?' },
    { label: 'RAG Architecture', text: 'Explain his Local RAG PDF Chat Application.' },
    { label: 'LangGraph Agents', text: 'Does Sandeep know LangGraph and agentic workflows?' },
    { label: 'Current Role', text: 'What did he build at Aptus IT Solution?' },
    { label: 'हिन्दी परिचय', text: 'संदीप कुमार चौरसिया के अनुभव और प्रोजेक्ट्स के बारे में बताएं।' },
  ];

  // Initialize Speech APIs check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRec) {
        setSpeechSupported(false);
      }
    }

    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  // When modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      stopListening();
      stopSpeaking();
    } else {
      if (initialMode) {
        setActiveMode(initialMode);
      }
    }
  }, [isOpen, initialMode]);

  // Auto scroll chat
  useEffect(() => {
    if (activeMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, activeMode]);

  // Update ref when isListening changes
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Stop text-to-speech
  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    isListeningRef.current = false;
  };

  // Speak text with SpeechSynthesis
  const speakText = (text: string) => {
    if (!audioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    stopSpeaking();

    // Clean formatting and links
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/\[\d+\]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/[\r\n]+/g, ' ')
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language;
      utterance.rate = 1.02;
      utterance.pitch = 1.0;

      // Match language voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = language.split('-')[0].toLowerCase();
        const matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
                        voices.find(v => v.lang.toLowerCase().includes('in')) ||
                        voices[0];
        if (matched) utterance.voice = matched;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        // Hands-free continuous loop in voice mode
        if (continuousMode && activeMode === 'voice') {
          setTimeout(() => {
            if (!isListeningRef.current) {
              startListening();
            }
          }, 500);
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis notice:", e);
      setIsSpeaking(false);
    }
  };

  // Request mic permission and start SpeechRecognition
  const startListening = async () => {
    stopSpeaking();
    setMicPermissionError(null);

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechSupported(false);
      setMicPermissionError("Speech recognition is supported in Chrome, Edge, Safari, and Opera.");
      return;
    }

    // Try requesting mic stream first to prompt browser permission dialog if needed
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err: any) {
      console.warn("Microphone permission prompt note:", err);
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setMicPermissionError("Microphone access is blocked. Please allow microphone permissions in your browser address bar.");
        return;
      }
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = language;

      finalTranscriptRef.current = '';
      setLiveTranscript('');
      setInterimTranscript('');

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }

        if (final) {
          finalTranscriptRef.current = (finalTranscriptRef.current ? finalTranscriptRef.current + ' ' : '') + final;
        }

        const currentCombined = (finalTranscriptRef.current + (interim ? ' ' + interim : '')).trim();
        setLiveTranscript(currentCombined);
        setInterimTranscript(interim);

        // If in chat mode, also fill the text input box
        if (activeMode === 'chat') {
          setInput(currentCombined);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        isListeningRef.current = false;

        if (event.error === 'not-allowed') {
          setMicPermissionError("Microphone permission was denied. Please allow microphone in your browser to speak.");
        } else if (event.error === 'no-speech') {
          // Normal timeout if user was silent, gracefully reset
        } else if (event.error === 'network') {
          setMicPermissionError("Network connection issue with speech service. Please try again or type your question.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
        setInterimTranscript('');

        const finalSaid = finalTranscriptRef.current.trim();
        if (finalSaid) {
          if (activeMode === 'voice') {
            handleProcessVoiceQuery(finalSaid);
          } else {
            setInput(finalSaid);
          }
        }
      };

      recognition.start();
    } catch (err: any) {
      console.warn("Recognition start failed:", err);
      setIsListening(false);
      isListeningRef.current = false;
      setMicPermissionError("Could not start speech recognition. Please check microphone permissions or type your question.");
    }
  };

  // Process question through /api/chat
  const handleProcessVoiceQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    setVoiceQuery(queryText);
    setLoading(true);
    stopSpeaking();

    // Also record in chat history so context is preserved across tabs
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      const data = await res.json();
      const reply = data.text || "I am grounded in Sandeep's verified background. He has 5+ years of IT engineering experience and specializes in RAG pipelines, LangGraph agents, and predictive machine learning models.";
      
      setVoiceResponse(reply);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
      };
      setMessages(prev => [...prev, aiMsg]);

      if (audioEnabled) {
        speakText(reply);
      }
    } catch {
      const fallback = "Sandeep Kumar Chaurasiya is a Data Science / AI Engineer at Aptus IT Solution. He specializes in local RAG architectures with Ollama & ChromaDB, LangGraph cyclic agents, and predictive machine learning.";
      setVoiceResponse(fallback);
      
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            source: 'Resume Profile',
            section: 'Verified Identity',
            excerpt: 'Sandeep Kumar Chaurasiya — AI Engineer, MCA & BCA',
          }
        ],
      };
      setMessages(prev => [...prev, fallbackMsg]);

      if (audioEnabled) {
        speakText(fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  // Send message in Chat Mode
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    if (isListening) {
      stopListening();
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
    setVoiceQuery(query.trim());

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      const reply = data.text || "I am grounded in Sandeep's verified background. He has 5+ years of IT engineering experience and specializes in RAG pipelines, LangGraph agents, and predictive machine learning models.";
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setVoiceResponse(reply);

      if (audioEnabled) {
        speakText(reply);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Sandeep Kumar Chaurasiya is a Data Science / AI Engineer at Aptus IT Solution. He holds MCA and BCA degrees and specializes in local RAG architectures, LangGraph cyclic agents, and predictive machine learning.",
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
      setVoiceResponse(errorMsg.text);
      if (audioEnabled) {
        speakText(errorMsg.text);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in-0 duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Unified Top Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm relative">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Sandeep AI & Voice</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold hidden sm:inline">
                  ALL-IN-ONE
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Text Chat & Live Spoken Conversation</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-mono">
              <button
                onClick={() => {
                  stopListening();
                  stopSpeaking();
                  setActiveMode('chat');
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeMode === 'chat'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xs:inline">Chat</span>
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  setActiveMode('voice');
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeMode === 'voice'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Voice Call</span>
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => {
                const nextLang = language === 'en-US' ? 'hi-IN' : 'en-US';
                setLanguage(nextLang);
                if (isListening) {
                  stopListening();
                  setTimeout(() => startListening(), 200);
                }
              }}
              className="px-2 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 text-[11px] font-mono font-bold transition-colors"
              title="Toggle Spoken Language: English / हिन्दी"
            >
              {language === 'en-US' ? 'EN' : 'हिन्दी'}
            </button>

            {/* Audio Speech Output Mute Toggle */}
            <button
              onClick={() => {
                if (audioEnabled) {
                  stopSpeaking();
                  setAudioEnabled(false);
                } else {
                  setAudioEnabled(true);
                }
              }}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                audioEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
              title={audioEnabled ? "Voice Audio is On" : "Voice Audio is Muted"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => {
                stopListening();
                stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Permission warning banner if microphone was blocked */}
        {micPermissionError && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{micPermissionError}</span>
            </div>
            <button
              onClick={() => {
                setMicPermissionError(null);
                startListening();
              }}
              className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-mono font-semibold text-[11px]"
            >
              Retry Mic
            </button>
          </div>
        )}

        {/* MODE 1: LIVE VOICE CALL MODE */}
        {activeMode === 'voice' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-between">
            {/* Top Status & Controls */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  isSpeaking ? 'bg-emerald-500 animate-ping' :
                  isListening ? 'bg-red-500 animate-pulse' :
                  loading ? 'bg-amber-500 animate-bounce' : 'bg-slate-400'
                }`} />
                <span className="font-bold text-slate-900">
                  {isSpeaking ? 'Sandeep AI Speaking...' :
                   isListening ? (language === 'hi-IN' ? 'सुन रहे हैं... बोलिए' : 'Listening... Speak clearly') :
                   loading ? 'Thinking & Synthesizing...' : 'Voice Ready — Tap Mic to Speak'}
                </span>
              </div>

              {/* Hands-free mode toggle */}
              <button
                onClick={() => setContinuousMode(!continuousMode)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors flex items-center gap-1.5 ${
                  continuousMode
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-white border-slate-300 text-slate-600'
                }`}
                title="Continuous conversation mode"
              >
                <span>Hands-Free Loop:</span>
                <span className="font-bold">{continuousMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Central Spoken Interaction & Visualizer Canvas */}
            <div className="my-auto text-center space-y-6 max-w-xl mx-auto w-full py-2">
              
              {/* Animated Microphone Hero Button */}
              <div className="relative inline-flex items-center justify-center">
                {/* Visualizer Pulses */}
                {(isListening || isSpeaking) && (
                  <>
                    <div className="absolute w-36 h-36 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
                    <div className="absolute w-28 h-28 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
                  </>
                )}

                <button
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else if (isSpeaking) {
                      stopSpeaking();
                    } else {
                      startListening();
                    }
                  }}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-xl relative z-10 ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700 text-white scale-105 ring-4 ring-red-400/40'
                      : isSpeaking
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white scale-105 ring-4 ring-emerald-400/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-105'
                  }`}
                  aria-label="Toggle Microphone"
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-8 h-8 animate-pulse mb-1" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Tap to Stop</span>
                    </>
                  ) : isSpeaking ? (
                    <>
                      <Square className="w-7 h-7 fill-white mb-1" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Mute</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-8 h-8 text-emerald-400 mb-1" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Tap to Speak</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sound Wave Equalizer Simulation */}
              <div className="flex items-center justify-center gap-1.5 h-8">
                {[40, 70, 100, 60, 90, 45, 80, 50, 95, 30].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isListening ? 'bg-red-500' : isSpeaking ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                    style={{
                      height: (isListening || isSpeaking) ? `${Math.max(8, height * (0.3 + ((i % 3) * 0.25)))}%` : '6px',
                    }}
                  />
                ))}
              </div>

              {/* Real-time Spoken Transcript Bubble */}
              {(liveTranscript || isListening) && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-sans shadow-md border border-slate-700 animate-in fade-in-50">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1 flex items-center justify-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>You are saying:</span>
                  </div>
                  <p className="font-medium text-slate-100">
                    "{liveTranscript || "Listening... Speak now..."}"
                  </p>
                </div>
              )}

              {/* AI Voice Response Bubble */}
              {!isListening && (
                <div className="p-4 rounded-xl bg-white border border-slate-300 shadow-md text-left space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sandeep AI Spoken Response</span>
                    </span>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Square className="w-2.5 h-2.5 fill-red-600" />
                        <span>Stop Voice</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-normal">
                    {voiceResponse}
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => speakText(voiceResponse)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-emerald-800" />
                      <span>Listen Again</span>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(voiceResponse);
                        setCopiedId('voice-copied');
                        setTimeout(() => setCopiedId(null), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-mono flex items-center gap-1 transition-colors"
                    >
                      {copiedId === 'voice-copied' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === 'voice-copied' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Spoken Question Chips */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="text-[11px] font-mono text-slate-600 mb-2 font-bold flex items-center justify-between">
                <span>Or Tap to Ask Spoken Question Directly:</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Instant Speech Audio 🔊</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProcessVoiceQuery(q.text)}
                    disabled={loading}
                    className="p-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-900 text-left text-[11px] font-medium transition-all shadow-2xs group flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase mb-0.5">
                      {q.label}
                    </span>
                    <span className="line-clamp-2 text-slate-700 group-hover:text-slate-900">
                      {q.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: TEXT CHAT & DICTATE MODE */}
        {activeMode === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            
            {/* Quick Sample Prompts Bar */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              <span className="text-slate-700 shrink-0 text-[11px] pl-1 font-bold">Suggested:</span>
              {sampleQuestions.slice(0, 4).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50 shrink-0 transition-colors font-medium shadow-2xs"
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Conversation Feed */}
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
                      {isUser ? <Mic className="w-4 h-4 text-emerald-400" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-2 max-w-[85%]">
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-slate-900 text-white rounded-tr-none'
                            : 'bg-slate-50 border border-slate-300 text-slate-900 rounded-tl-none font-normal'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Verified Citations Box */}
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

                      {/* Message Actions */}
                      {!isUser && (
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => speakText(msg.text)}
                            className="hover:text-emerald-700 flex items-center gap-1 font-semibold"
                            title="Read aloud with speech synthesis"
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
                    <span>Synthesizing answer from verified portfolio knowledge base...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar with Integrated Microphone & Send */}
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
                    placeholder={
                      isListening
                        ? (language === 'hi-IN' ? "सुन रहे हैं... बोलिए" : "Listening... Speak now")
                        : "Ask about Sandeep's RAG projects, LangGraph, Python, BCA/MCA, or experience..."
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    className={`w-full pl-4 pr-12 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none transition-colors ${
                      isListening
                        ? 'border-red-500 ring-2 ring-red-400/20'
                        : 'border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />

                  {/* Inline Speech-to-Text Microphone Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isListening) {
                        stopListening();
                      } else {
                        startListening();
                      }
                    }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                      isListening
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                    title={isListening ? "Stop microphone" : "Speak question using microphone"}
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

              {/* Status bar */}
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Speech-to-Text & Spoken Audio Enabled</span>
                </span>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: 'welcome',
                        sender: 'assistant',
                        text: "Session cleared. What would you like to know about Sandeep's skills or background?",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ]);
                    stopSpeaking();
                  }}
                  className="hover:text-slate-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
