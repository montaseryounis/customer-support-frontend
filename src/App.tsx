// أضف هذا للـ state
const [threadId, setThreadId] = useState<string | null>(null)

// في sendMessage عدّل الـ fetch
const res = await fetch(`${API_URL}/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: input,
    thread_id: threadId  // ← يرسل السياق
  }),
})
const data = await res.json()
setThreadId(data.thread_id)  // ← يحفظ السياق للرسالة التالية
setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
