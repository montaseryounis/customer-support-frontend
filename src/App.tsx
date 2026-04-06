import { useState, useRef, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'مرحباً! أنا عزام 🎖️ مساعدك الذكي لتسعير الهدايا الترويجية. كيف أقدر أساعدك اليوم؟'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [responseId, setResponseId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          previous_response_id: responseId
        }),
      })

      if (!res.ok) throw new Error('فشل الاتصال بالـ Backend')

      const data = await res.json()
      setResponseId(data.response_id)
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ خطأ في الاتصال بالـ Backend. تأكد من أن الخدمة تعمل.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="header-icon">🎖️</span>
        <div>
          <h2>عزام</h2>
          <p>مساعد تسعير الهدايا الترويجية</p>
        </div>
        <span className="status-dot">●</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="اكتب طلبك هنا... مثال: بوكس MDF 25×20×8"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? '...' : 'إرسال'}
        </button>
      </div>
    </div>
  )
}
