import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  Sparkles, 
  Globe, 
  Play, 
  AlertCircle,
  Square,
  Radio,
  Check,
  Copy
} from 'lucide-react';

export const VoiceLab: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiSpeechResponse, setAiSpeechResponse] = useState(
    "Hello! I am Sandeep AI Voice Assistant. Speak your query in English or Hindi, or click any prompt below to hear my spoken response."
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState<'en-US' | 'hi-IN'>('en-US');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const transcriptRef = useRef<string>('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSpeechSupported(false);
      }
    }

    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  const sampleVoicePrompts = [
    { label: "Overview", text: "Who is Sandeep Kumar Chaurasiya and what are his core AI skills?" },
    { label: "Education", text: "What are Sandeep's MCA and BCA academic degrees?" },
    { label: "RAG Architecture", text: "Explain his Local RAG PDF Chat Application with Ollama and ChromaDB." },
    { label: "Agentic AI", text: "Does Sandeep know LangGraph, cyclic agents, and tool calling?" },
    { label: "Aptus IT Solution", text: "What did Sandeep build as AI & Data Science Engineer at Aptus IT Solution?" },
    { label: "हिन्दी परिचय", text: "संदीप कुमार चौरसिया के बारे में संक्षेप में बताइए।" },
  ];

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleStartListening = async () => {
    stopSpeaking();
    setErrorMsg(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setErrorMsg("Voice speech recognition is supported in Google Chrome, Microsoft Edge, Safari, and Opera.");
      return;
    }

    // Prompt mic permission if available
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (e: any) {
      if (e?.name === 'NotAllowedError' || e?.name === 'PermissionDeniedError') {
        setErrorMsg("Microphone permission was denied. Please allow microphone permissions in your browser to speak.");
        return;
      }
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

      transcriptRef.current = '';
      setTranscript('');

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
          transcriptRef.current = (transcriptRef.current ? transcriptRef.current + ' ' : '') + final;
        }
        setTranscript((transcriptRef.current + ' ' + interim).trim());
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition notice:", e.error);
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setErrorMsg("Microphone access was blocked. Please check browser permissions.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalQuery = transcriptRef.current.trim();
        if (finalQuery) {
          handleVoiceQuery(finalQuery);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setErrorMsg("Could not start microphone. You can tap any sample question below to test voice playback.");
    }
  };

  const handleVoiceQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    setLoading(true);
    stopSpeaking();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });
      const data = await res.json();
      const reply = data.text || "Sandeep has 5+ years of IT engineering experience and specializes in local RAG pipelines with Ollama and ChromaDB, LangGraph cyclic agents, and predictive machine learning models.";
      setAiSpeechResponse(reply);
      speakText(reply);
    } catch {
      const fallback = "Sandeep is an AI Engineer and Data Scientist specializing in LangChain, LangGraph, RAG, and predictive machine learning models at Aptus IT Solution. He holds MCA and BCA degrees.";
      setAiSpeechResponse(fallback);
      speakText(fallback);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    stopSpeaking();

    const clean = text
      .replace(/[*#_`]/g, '')
      .replace(/\[\d+\]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = language;
    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const langPrefix = language.split('-')[0].toLowerCase();
      const matched = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) || voices[0];
      if (matched) utterance.voice = matched;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mic className="w-5 h-5 text-emerald-600" />
            <span>Voice AI Assistant ("Talk to Sandeep AI")</span>
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Two-way spoken conversation grounded in verified portfolio resume and project architecture.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-slate-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none"
          >
            <option value="en-US">English (en-US)</option>
            <option value="hi-IN">Hindi / हिन्दी (hi-IN)</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-amber-800 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Spoken Interaction Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-300 text-center space-y-6 shadow-sm">
        
        {/* Animated Microphone Button */}
        <div className="relative inline-flex items-center justify-center">
          {(isListening || isSpeaking) && (
            <>
              <div className="absolute w-32 h-32 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
              <div className="absolute w-24 h-24 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={() => {
              if (isListening) {
                stopListening();
              } else if (isSpeaking) {
                stopSpeaking();
              } else {
                handleStartListening();
              }
            }}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all shadow-xl relative z-10 ${
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
                <MicOff className="w-7 h-7 animate-pulse mb-0.5" />
                <span className="text-[10px] font-mono font-bold uppercase">Listening</span>
              </>
            ) : isSpeaking ? (
              <>
                <Square className="w-6 h-6 fill-white mb-0.5" />
                <span className="text-[10px] font-mono font-bold uppercase">Mute</span>
              </>
            ) : (
              <>
                <Mic className="w-7 h-7 text-emerald-400 mb-0.5" />
                <span className="text-[10px] font-mono font-bold uppercase">Speak</span>
              </>
            )}
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono">
          <span className={`w-2.5 h-2.5 rounded-full ${
            isSpeaking ? 'bg-emerald-500 animate-ping' :
            isListening ? 'bg-red-500 animate-pulse' :
            loading ? 'bg-amber-500 animate-bounce' : 'bg-slate-400'
          }`} />
          <span className="font-bold text-slate-800">
            {isSpeaking ? 'Assistant is Speaking Audio Output...' :
             isListening ? (language === 'hi-IN' ? 'सुन रहे हैं... बोलिए' : 'Listening to your voice...') :
             loading ? 'Synthesizing verified AI response...' : 'Tap the microphone to speak naturally'}
          </span>
        </div>

        {/* Equalizer Wave simulation */}
        <div className="flex items-center justify-center gap-1 h-6">
          {[30, 60, 90, 50, 80, 40, 70, 45, 95, 25].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isListening ? 'bg-red-500' : isSpeaking ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
              style={{
                height: (isListening || isSpeaking) ? `${Math.max(6, h * 0.8)}%` : '4px',
              }}
            />
          ))}
        </div>

        {/* Real-time transcript display */}
        {(transcript || isListening) && (
          <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-sans max-w-xl mx-auto border border-slate-700">
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Spoken Transcript:</span>
            </div>
            <p className="font-medium text-slate-100">
              "{transcript || "Listening..."}"
            </p>
          </div>
        )}

        {/* Response Box */}
        <div className="p-4 rounded-xl bg-white border border-slate-300 max-w-xl mx-auto text-left space-y-2 shadow-xs">
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
            {aiSpeechResponse}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => speakText(aiSpeechResponse)}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3 h-3 fill-emerald-800" />
              <span>Play Audio</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(aiSpeechResponse);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-mono flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Spoken Questions */}
      <div>
        <h4 className="text-xs font-mono font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center justify-between">
          <span>Click any prompt to trigger speech question & voice response:</span>
          <span className="text-emerald-700 text-[10px]">Instant Speech Output 🔊</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {sampleVoicePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleVoiceQuery(prompt.text)}
              disabled={loading}
              className="p-3 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-left text-xs text-slate-900 transition-all shadow-2xs group flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase mb-1">
                {prompt.label}
              </span>
              <span className="text-slate-700 group-hover:text-slate-900">
                "{prompt.text}"
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
