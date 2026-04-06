* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-container {
  width: 100%;
  max-width: 700px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.chat-header {
  background: #2563eb;
  color: white;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
}

.message.user {
  background: #2563eb;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message.assistant {
  background: #f1f5f9;
  color: #1e293b;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.chat-input {
  display: flex;
  padding: 12px;
  gap: 8px;
  border-top: 1px solid #e2e8f0;
  background: white;
}

.chat-input input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  font-size: 15px;
  outline: none;
}

.chat-input input:focus {
  border-color: #2563eb;
}

.chat-input button {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 20px;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
}

.chat-input button:disabled {
  background: #94a3b8;
}

@media (max-width: 480px) {
  .chat-header {
    font-size: 16px;
    padding: 14px;
  }

  .message {
    font-size: 14px;
    max-width: 90%;
  }

  .chat-input input {
    font-size: 14px;
    padding: 10px 14px;
  }

  .chat-input button {
    padding: 10px 16px;
    font-size: 14px;
  }
}
