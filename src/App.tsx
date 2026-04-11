import { ChatKit, useChatKit } from "@openai/chatkit-react";
import "./App.css";

function App() {
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        if (existing) {
          return existing;
        }

        const res = await fetch(
          "https://customer-support-backend-production-62a3.up.railway.app/chatkit/session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to create ChatKit session");
        }

        const data = await res.json();
        return data.client_secret;
      },
    },
  });

  return (
    <div className="app-container">
      <h1>عزام - وكيل التسعير</h1>
      <div className="chat-wrapper">
        <ChatKit control={control} className="chatkit-panel" />
      </div>
    </div>
  );
}

export default App;
