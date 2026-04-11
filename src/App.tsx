import { useEffect, useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";

export default function App() {
  const [status, setStatus] = useState("Starting...");
  const [sessionInfo, setSessionInfo] = useState("No session request yet");
  const [componentReady, setComponentReady] = useState(false);

  useEffect(() => {
    setComponentReady(true);
  }, []);

  const chatkit = useChatKit({
    api: {
      async getClientSecret(existing) {
        setSessionInfo("Requesting client secret...");

        if (existing) {
          setSessionInfo("Using existing client secret");
          return existing;
        }

        const response = await fetch(
          "https://customer-support-backend-production-62a3.up.railway.app/chatkit/session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          setSessionInfo(`Session error: ${response.status} ${text}`);
          throw new Error(`Session error: ${response.status} ${text}`);
        }

        const data = await response.json();
        setSessionInfo("Client secret received successfully");
        return data.client_secret;
      },
    },
    onError: ({ error }) => {
      setStatus(`ChatKit error: ${error.message}`);
    },
  });

  useEffect(() => {
    setStatus("ChatKit initialized");
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#ffffff",
        color: "#111111",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <div><strong>Status:</strong> {status}</div>
        <div><strong>Session:</strong> {sessionInfo}</div>
        <div><strong>Component ready:</strong> {componentReady ? "yes" : "no"}</div>
      </div>

      <div
        style={{
          width: "100%",
          height: "700px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <ChatKit control={chatkit.control} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
