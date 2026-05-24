import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Mic, MicOff } from 'lucide-react'

const BOT_RESPONSES = {
  vaccine: [
    "Based on the National Immunization Schedule, a child should receive BCG, OPV-0, and Hepatitis B at birth. The next doses at 6 weeks include Pentavalent-1, OPV-1, Rotavirus-1, and PCV-1. Would you like me to check the full schedule?",
    "Missed vaccines can often be caught up! It's important to consult your nearest health center. I can help you locate one nearby.",
  ],
  skin: [
    "For skin concerns, I recommend using our AI Skin Scan feature. Simply upload or capture a photo, and our AI will analyze it for you. Remember, this is for guidance only — always consult a doctor for proper diagnosis.",
    "Common skin issues in rural areas include fungal infections, eczema, and insect bites. Keeping the area clean and dry is the best first step. Would you like to do a skin scan now?",
  ],
  health: [
    "Staying healthy involves regular check-ups, proper nutrition, clean water, and timely vaccinations. For children under 5, tracking weight and height at the Anganwadi center is important.",
    "For fever lasting more than 3 days, persistent cough, or skin rashes, please visit your nearest PHC (Primary Health Centre). I can provide basic guidance but cannot replace a doctor's consultation.",
  ],
  default: [
    "I'm your KinWell health assistant! I can help with:\n\n🔬 Skin analysis questions\n💉 Vaccine schedules & reminders\n🏥 Finding nearby health centers\n💊 Basic health guidance\n\nWhat would you like to know?",
    "That's a great question! While I can provide general health guidance, please remember that for specific medical concerns, it's always best to consult a healthcare professional. How can I help you?",
  ],
}

const QUICK_REPLIES = [
  { text: '💉 Vaccine schedule', category: 'vaccine' },
  { text: '🔬 Skin concern', category: 'skin' },
  { text: '🏥 Nearest doctor', category: 'health' },
  { text: '👶 Baby health tips', category: 'health' },
]

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
]

export default function Chatbot() {
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Namaste! 🙏 I'm your KinWell health assistant. I can help you with vaccines, skin concerns, and general health guidance. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getResponse = (text) => {
    const lower = text.toLowerCase()
    if (lower.includes('vaccine') || lower.includes('dose') || lower.includes('immuniz') || lower.includes('टीका')) {
      return BOT_RESPONSES.vaccine[Math.floor(Math.random() * BOT_RESPONSES.vaccine.length)]
    }
    if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch') || lower.includes('त्वचा')) {
      return BOT_RESPONSES.skin[Math.floor(Math.random() * BOT_RESPONSES.skin.length)]
    }
    if (lower.includes('health') || lower.includes('fever') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('स्वास्थ्य')) {
      return BOT_RESPONSES.health[Math.floor(Math.random() * BOT_RESPONSES.health.length)]
    }
    return BOT_RESPONSES.default[Math.floor(Math.random() * BOT_RESPONSES.default.length)]
  }

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { type: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate bot typing
    setTimeout(() => {
      const botReply = { type: 'bot', text: getResponse(text) }
      setMessages(prev => [...prev, botReply])
    }, 800 + Math.random() * 600)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickReply = (reply) => {
    sendMessage(reply.text)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false)
        sendMessage('What vaccines does my child need?')
      }, 2000)
    }
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">Health Chat</h1>
      </div>

      {/* Language Selector */}
      <div className="language-selector">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            className={`lang-chip ${lang === l.code ? 'active' : ''}`}
            onClick={() => setLang(l.code)}
          >
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div className={`chat-message ${msg.type}`} key={i}>
              <div className={`chat-avatar ${msg.type}`}>
                {msg.type === 'bot' ? '🩺' : '👤'}
              </div>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="quick-replies">
          {QUICK_REPLIES.map((reply, i) => (
            <button
              key={i}
              className="quick-reply-btn"
              onClick={() => handleQuickReply(reply)}
            >
              {reply.text}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <button
            type="button"
            className={`chat-voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={toggleRecording}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
            id="voice-btn"
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            className="chat-input"
            placeholder={lang === 'hi' ? 'यहाँ टाइप करें...' : 'Type your message...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="chat-input"
          />
          <button type="submit" className="chat-send-btn" aria-label="Send message" id="chat-send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
