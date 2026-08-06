'use client'
import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Sparkles, MessageSquare, ShieldAlert, Pill, Microscope, Stethoscope, ChevronDown, User } from 'lucide-react'

export type ChatMode = 'general' | 'symptom' | 'lab' | 'medication'

interface Message {
  id: string
  sender: 'user' | 'agent'
  text: string
  agentName?: string
  timestamp: string
  disclaimer?: boolean
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ChatMode>('symptom')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      agentName: 'Symptom Triage Agent',
      text: 'Hello! I am your MediSphere Multi-Agent AI Assistant. How can I support your health or hospital visit today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      disclaimer: true,
    },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const presetQuestions: Record<ChatMode, string[]> = {
    symptom: [
      'I have a headache and mild fever',
      'What should I do for acute lower back pain?',
      'Check emergency wait times',
    ],
    lab: [
      'Explain my HbA1c result of 7.2%',
      'What does elevated ALT/AST indicate?',
      'Is a WBC count of 12.5 high?',
    ],
    medication: [
      'Can I take Amoxicillin with Ibuprofen?',
      'Set a reminder for my 8 PM Metformin',
      'When should I refill my blood pressure meds?',
    ],
    general: [
      'Find an available Cardiologist',
      'Check bed capacity in Surgical Ward',
      'Estimate out-of-pocket cost for MRI scan',
    ],
  }

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setLoading(true)

    // Simulate Multi-Agent AI processing
    setTimeout(() => {
      let agentResponse = ''
      let agentName = 'Health Assistant'
      let isDisclaimer = false

      if (mode === 'symptom') {
        agentName = 'Symptom Guidance Agent'
        isDisclaimer = true
        if (query.toLowerCase().includes('chest pain') || query.toLowerCase().includes('fever')) {
          agentResponse = '⚠️ **Emergency Notice**: If you are experiencing severe chest pain, shortness of breath, or sudden high fever, please press the **Emergency SOS** button immediately or call emergency services.\n\nFor mild symptoms: Hydrate well, monitor your temperature, and schedule a consultation with an Internal Medicine specialist.'
        } else {
          agentResponse = `Based on your description ("${query}"), this could be linked to mild viral fatigue or tension. Would you like me to reserve a consultation slot with a general practitioner?`
        }
      } else if (mode === 'lab') {
        agentName = 'Lab Report Explainer Agent'
        isDisclaimer = true
        agentResponse = `Analyzing diagnostic marker for: "${query}".\n\n- **Clinical Interpretation**: Elevated biomarkers indicate active metabolic or immune response. Always discuss with your ordering physician.\n- **Recommended Follow-up**: Repeat panel in 14 days and link your recent fasting records.`
      } else if (mode === 'medication') {
        agentName = 'Medication Assistant Agent'
        agentResponse = `Checking drug database for: "${query}". No critical contraindications detected. Take with food to minimize GI discomfort and maintain 8-hour dosing intervals.`
      } else {
        agentName = 'Executive Care Navigator'
        agentResponse = `Processed query: "${query}". Found 3 available slots with Dr. Aris Thorne (Cardiology) today at 14:00, 15:30, and 17:00. Would you like me to lock a booking pass?`
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentName,
        text: agentResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: isDisclaimer,
      }

      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-2xl hover:scale-105 transition-all duration-300 border border-indigo-400/30 group"
          aria-label="Open AI Health Assistant Chat"
        >
          <div className="relative">
            <Bot size={22} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>
          <span className="text-sm">AI Health Assistant</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] flex flex-col rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  MediSphere AI Mesh
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                </h3>
                <p className="text-[11px] text-slate-400">Multi-Agent Clinical Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Agent Mode Selector Bar */}
          <div className="p-2 bg-slate-950/60 border-b border-white/5 flex gap-1 overflow-x-auto">
            <button
              onClick={() => setMode('symptom')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'symptom' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Stethoscope size={13} /> Triage
            </button>
            <button
              onClick={() => setMode('lab')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'lab' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Microscope size={13} /> Lab Explainer
            </button>
            <button
              onClick={() => setMode('medication')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'medication' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Pill size={13} /> Medication
            </button>
            <button
              onClick={() => setMode('general')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${mode === 'general' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Sparkles size={13} /> General
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'agent' && (
                  <span className="text-[10px] font-semibold text-indigo-400 mb-1 flex items-center gap-1">
                    <Bot size={11} /> {msg.agentName}
                  </span>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.disclaimer && (
                  <span className="text-[9px] text-slate-500 mt-1 max-w-[85%]">
                    ℹ️ Informational guidance only. Not a medical diagnosis.
                  </span>
                )}
                <span className="text-[9px] text-slate-500 mt-0.5">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/50 text-slate-400 text-xs w-max">
                <Bot size={14} className="animate-spin text-indigo-400" />
                <span>Multi-Agent Mesh is evaluating...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-950/40 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
            {presetQuestions[mode].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/5"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Ask ${mode} assistant...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2 text-xs bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 placeholder-slate-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-lg shadow-indigo-600/20"
              aria-label="Send Message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
